import { getContract } from "../blockchain/blockchainService";

export async function addTransaction(data) {

    const contract = await getContract();

    const tx = await contract.addTransaction(
        data.customerId,
        data.menuItems,
        data.totalPrice,
        data.specialRequest
    );

    return await tx.wait();

}

export async function getTransactions(customerId) {

    const contract = await contract.getTransactionsByCustomer(customerId);

    return await contract.getTransactionsByCustomer(customerId);
    
}