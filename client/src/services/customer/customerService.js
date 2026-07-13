/**
 * Customer Service
 * Interacts with CustomerStorage smart contract for customer CRUD operations.
 */

export async function addCustomer(contract, { fullName, phoneNumber, favoriteMenu, foodAllergies, specialNotes }) {
    const tx = await contract.addCustomer(
        fullName,
        phoneNumber,
        favoriteMenu || "",
        foodAllergies || "",
        specialNotes || ""
    );
    const receipt = await tx.wait();
    return receipt;
}

export async function getCustomer(contract, customerId) {
    const result = await contract.getCustomer(customerId);
    return {
        customerId: Number(result.customerId),
        fullName: result.fullName,
        phoneNumber: result.phoneNumber,
        favoriteMenu: result.favoriteMenu,
        foodAllergies: result.foodAllergies,
        specialNotes: result.specialNotes,
        createdAt: Number(result.createdAt),
        updatedAt: Number(result.updatedAt),
        exists: result.exists,
    };
}

export async function getCustomerCount(contract) {
    const count = await contract.getCustomerCount();
    return Number(count);
}

export async function getAllCustomers(contract) {
    const count = await getCustomerCount(contract);
    const customers = [];

    for (let i = 1; i <= count; i++) {
        try {
            const customer = await getCustomer(contract, i);
            if (customer.exists) {
                customers.push(customer);
            }
        } catch {
            // Customer may not exist at this ID, skip
        }
    }

    return customers;
}

export async function searchCustomerByPhone(contract, phoneNumber) {
    const result = await contract.searchCustomerByPhone(phoneNumber);
    return {
        customerId: Number(result.customerId),
        fullName: result.fullName,
        phoneNumber: result.phoneNumber,
        favoriteMenu: result.favoriteMenu,
        foodAllergies: result.foodAllergies,
        specialNotes: result.specialNotes,
        createdAt: Number(result.createdAt),
        updatedAt: Number(result.updatedAt),
        exists: result.exists,
    };
}
