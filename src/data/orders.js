// Mock order data for all 7 levels — Buy side
// reward = amount * rewardRate (now 7%), bonus is per-level flat addition

const LEVEL_CONFIG = {
  L1: { rewardRate: 0.07, bonus: 2.0, minAmount: 100, maxAmount: 300 },
  L2: { rewardRate: 0.07, bonus: 3.0, minAmount: 300, maxAmount: 500 },
  L3: { rewardRate: 0.07, bonus: 0, minAmount: 500, maxAmount: 1000 },
  L4: { rewardRate: 0.07, bonus: 5.0, minAmount: 1000, maxAmount: 2000 },
  L5: { rewardRate: 0.07, bonus: 8.0, minAmount: 2000, maxAmount: 5000 },
  L6: { rewardRate: 0.07, bonus: 12.0, minAmount: 5000, maxAmount: 10000 },
  L7: { rewardRate: 0.07, bonus: 20.0, minAmount: 10000, maxAmount: 50000 },
};

export const buyOrders = {
  L1: [
    { id: 'B1-001', amount: 200.0, quantity: 9 },
    { id: 'B1-002', amount: 250.0, quantity: 8 },
    { id: 'B1-003', amount: 285.0, quantity: 7 },
    { id: 'B1-004', amount: 150.0, quantity: 6 },
    { id: 'B1-005', amount: 252.0, quantity: 6 },
    { id: 'B1-006', amount: 280.0, quantity: 5 },
    { id: 'B1-007', amount: 159.0, quantity: 4 },
    { id: 'B1-008', amount: 175.0, quantity: 3 },
    { id: 'B1-009', amount: 220.0, quantity: 7 },
  ],
  L2: [
    { id: 'B2-001', amount: 340.0, quantity: 2 },
    { id: 'B2-002', amount: 360.0, quantity: 2 },
    { id: 'B2-003', amount: 305.0, quantity: 1 },
    { id: 'B2-004', amount: 307.0, quantity: 1 },
    { id: 'B2-005', amount: 309.0, quantity: 1 },
    { id: 'B2-006', amount: 310.0, quantity: 1 },
    { id: 'B2-007', amount: 312.0, quantity: 1 },
    { id: 'B2-008', amount: 350.0, quantity: 3 },
  ],
  L3: [
    { id: 'B3-001', amount: 807.0, quantity: 1 },
    { id: 'B3-002', amount: 650.0, quantity: 2 },
    { id: 'B3-003', amount: 720.0, quantity: 1 },
  ],
  L4: [
    { id: 'B4-001', amount: 1200.0, quantity: 3 },
    { id: 'B4-002', amount: 1500.0, quantity: 2 },
    { id: 'B4-003', amount: 1800.0, quantity: 1 },
    { id: 'B4-004', amount: 1350.0, quantity: 2 },
  ],
  L5: [
    { id: 'B5-001', amount: 2500.0, quantity: 2 },
    { id: 'B5-002', amount: 3000.0, quantity: 1 },
    { id: 'B5-003', amount: 4500.0, quantity: 1 },
  ],
  L6: [
    { id: 'B6-001', amount: 5500.0, quantity: 2 },
    { id: 'B6-002', amount: 7000.0, quantity: 1 },
    { id: 'B6-003', amount: 8500.0, quantity: 1 },
  ],
  L7: [
    { id: 'B7-001', amount: 15000.0, quantity: 1 },
    { id: 'B7-002', amount: 25000.0, quantity: 1 },
    { id: 'B7-003', amount: 42000.0, quantity: 1 },
  ],
};

// Sell side
export const sellOrders = {
  L1: [
    { id: 'S1-001', amount: 180.0, quantity: 5 },
    { id: 'S1-002', amount: 210.0, quantity: 4 },
    { id: 'S1-003', amount: 240.0, quantity: 6 },
    { id: 'S1-004', amount: 160.0, quantity: 3 },
    { id: 'S1-005', amount: 275.0, quantity: 8 },
    { id: 'S1-006', amount: 190.0, quantity: 2 },
  ],
  L2: [
    { id: 'S2-001', amount: 320.0, quantity: 3 },
    { id: 'S2-002', amount: 380.0, quantity: 2 },
    { id: 'S2-003', amount: 410.0, quantity: 1 },
    { id: 'S2-004', amount: 355.0, quantity: 2 },
  ],
  L3: [
    { id: 'S3-001', amount: 650.0, quantity: 2 },
    { id: 'S3-002', amount: 920.0, quantity: 1 },
  ],
  L4: [
    { id: 'S4-001', amount: 1100.0, quantity: 2 },
    { id: 'S4-002', amount: 1650.0, quantity: 1 },
  ],
  L5: [
    { id: 'S5-001', amount: 2800.0, quantity: 1 },
    { id: 'S5-002', amount: 3500.0, quantity: 1 },
  ],
  L6: [
    { id: 'S6-001', amount: 6000.0, quantity: 1 },
    { id: 'S6-002', amount: 8000.0, quantity: 1 },
  ],
  L7: [
    { id: 'S7-001', amount: 18000.0, quantity: 1 },
    { id: 'S7-002', amount: 30000.0, quantity: 1 },
  ],
};

/**
 * Compute reward and final RP for an order at a given level
 * Commission is now 7%
 */
export function computeOrderDetails(order, level) {
  const config = LEVEL_CONFIG[level];
  const reward = parseFloat((order.amount * config.rewardRate).toFixed(2));
  const bonus = config.bonus;
  const finalRP = parseFloat((order.amount + reward + bonus).toFixed(2));
  return { ...order, reward, bonus, finalRP, level };
}

/**
 * Get processed orders for a level
 */
export function getOrdersForLevel(level, side = 'buy') {
  const raw = side === 'buy' ? buyOrders[level] : sellOrders[level];
  if (!raw) return [];
  return raw.map(order => computeOrderDetails(order, level));
}

/**
 * Sort orders
 */
export function sortOrders(orders, direction = 'asc') {
  return [...orders].sort((a, b) =>
    direction === 'asc' ? a.amount - b.amount : b.amount - a.amount
  );
}

export { LEVEL_CONFIG };
