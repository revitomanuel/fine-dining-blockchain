import { getContract } from "../blockchain/blockchainService";

export async function addCustomer(data) {

    const contract = await getContract();

    const tx = await contract.addCustomer(
        data.fullName,
        data.phoneNumber,
        data.favoriteMenu,
        data.foodAllergies,
        data.specialNotes
    );

    return await tx.wait();

}

export async function getCustomer(customerId) {

    const contract = await getContract();

    return await contract.getCustomer(customerId);

}

export async function getCustomerCount() {

    const contract = await getContract();

    return Number(
        await contract.getCustomerCount()
    );

}