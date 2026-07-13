/**
 * Transaction Service
 * Interacts with CustomerStorage smart contract for transaction operations.
 */

export async function addTransaction(contract, { customerId, menuItems, totalPrice, specialRequest }) {
    const tx = await contract.addTransaction(
        customerId,
        menuItems,
        totalPrice,
        specialRequest || ""
    );
    const receipt = await tx.wait();
    return receipt;
}

export async function getTransactionsByCustomer(contract, customerId) {
    const results = await contract.getTransactionsByCustomer(customerId);
    return results.map((t) => ({
        transactionId: Number(t.transactionId),
        menuItems: t.menuItems,
        totalPrice: Number(t.totalPrice),
        specialRequest: t.specialRequest,
        transactionDate: Number(t.transactionDate),
    }));
}

export async function getTransactionCount(contract) {
    const count = await contract.getTransactionCount();
    return Number(count);
}

export async function getAllTransactions(contract, customerCount) {
    const allTransactions = [];

    for (let i = 1; i <= customerCount; i++) {
        try {
            const txs = await getTransactionsByCustomer(contract, i);
            txs.forEach((t) => {
                allTransactions.push({
                    ...t,
                    customerId: i,
                });
            });
        } catch {
            // Customer may not exist, skip
        }
    }

    // Sort by date descending
    allTransactions.sort((a, b) => b.transactionDate - a.transactionDate);

    return allTransactions;
}
