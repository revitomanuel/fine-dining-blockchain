// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/**
 * @title CustomerStorage
 * @author Revito Manuel Hasudungan Manik
 * @notice Smart Contract untuk menyimpan data preferensi pelanggan
 *         restoran fine dining berbasis Ethereum.
 */
contract CustomerStorage {

    /*//////////////////////////////////////////////////////////////
                                ERRORS
    //////////////////////////////////////////////////////////////*/

    error CustomerNotFound();
    error CustomerAlreadyExists();
    error InvalidCustomerData();

    /*//////////////////////////////////////////////////////////////
                              DATA TYPES
    //////////////////////////////////////////////////////////////*/

    struct Customer {
        uint256 customerId;
        string fullName;
        string phoneNumber;
        string favoriteMenu;
        string foodAllergies;
        string specialNotes;
        uint256 createdAt;
        uint256 updatedAt;
        bool exists;
    }

    struct Transaction {
        uint256 transactionId;
        string menuItems;
        uint256 totalPrice;
        string specialRequest;
        uint256 transactionDate;
    }

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    uint256 private customerCount;
    uint256 private transactionCount;

    mapping(uint256 => Customer) private customers;
    mapping(uint256 => Transaction[]) private customerTransactions;
    mapping(string => uint256) private phoneToCustomerId;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event CustomerCreated(
        uint256 indexed customerId,
        string fullName
    );

    event CustomerUpdated(
        uint256 indexed customerId
    );

    event TransactionAdded(
        uint256 indexed customerId,
        uint256 indexed transactionId
    );

    /*//////////////////////////////////////////////////////////////
                               MODIFIER
    //////////////////////////////////////////////////////////////*/

    modifier customerExists(uint256 customerId) {
        if (!customers[customerId].exists) {
            revert CustomerNotFound();
        }
        _;
    }

    /*//////////////////////////////////////////////////////////////
                         CUSTOMER FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function addCustomer(
        string memory fullName,
        string memory phoneNumber,
        string memory favoriteMenu,
        string memory foodAllergies,
        string memory specialNotes
    ) public returns (uint256) {

        if (
            bytes(fullName).length == 0 ||
            bytes(phoneNumber).length == 0
        ) {
            revert InvalidCustomerData();
        }

        if (phoneToCustomerId[phoneNumber] != 0) {
            revert CustomerAlreadyExists();
        }

        customerCount++;

        customers[customerCount] = Customer({
            customerId: customerCount,
            fullName: fullName,
            phoneNumber: phoneNumber,
            favoriteMenu: favoriteMenu,
            foodAllergies: foodAllergies,
            specialNotes: specialNotes,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            exists: true
        });

        phoneToCustomerId[phoneNumber] = customerCount;

        emit CustomerCreated(customerCount, fullName);

        return customerCount;
    }

    function updateCustomer(
        uint256 customerId,
        string memory fullName,
        string memory phoneNumber,
        string memory favoriteMenu,
        string memory foodAllergies,
        string memory specialNotes
    )
        public
        customerExists(customerId)
    {
        Customer storage customer = customers[customerId];

        if (
            keccak256(bytes(customer.phoneNumber))
            !=
            keccak256(bytes(phoneNumber))
        ) {
            delete phoneToCustomerId[customer.phoneNumber];
            phoneToCustomerId[phoneNumber] = customerId;
        }

        customer.fullName = fullName;
        customer.phoneNumber = phoneNumber;
        customer.favoriteMenu = favoriteMenu;
        customer.foodAllergies = foodAllergies;
        customer.specialNotes = specialNotes;
        customer.updatedAt = block.timestamp;

        emit CustomerUpdated(customerId);
    }

    /*//////////////////////////////////////////////////////////////
                           VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getCustomer(
        uint256 customerId
    )
        public
        view
        customerExists(customerId)
        returns (Customer memory)
    {
        return customers[customerId];
    }

    function searchCustomerByPhone(
        string memory phoneNumber
    )
        public
        view
        returns (Customer memory)
    {
        uint256 customerId = phoneToCustomerId[phoneNumber];

        if (customerId == 0) {
            revert CustomerNotFound();
        }

        return customers[customerId];
    }

    function customerExistsById(
        uint256 customerId
    )
        public
        view
        returns (bool)
    {
        return customers[customerId].exists;
    }

    function getCustomerCount()
        public
        view
        returns (uint256)
    {
        return customerCount;
    }

    /*//////////////////////////////////////////////////////////////
                      TRANSACTION FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function addTransaction(
        uint256 customerId,
        string memory menuItems,
        uint256 totalPrice,
        string memory specialRequest
    )
        public
        customerExists(customerId)
    {
        transactionCount++;

        customerTransactions[customerId].push(
            Transaction({
                transactionId: transactionCount,
                menuItems: menuItems,
                totalPrice: totalPrice,
                specialRequest: specialRequest,
                transactionDate: block.timestamp
            })
        );

        emit TransactionAdded(customerId, transactionCount);
    }

    function getTransactionsByCustomer(
        uint256 customerId
    )
        public
        view
        customerExists(customerId)
        returns (Transaction[] memory)
    {
        return customerTransactions[customerId];
    }

    function getTransactionCount()
        public
        view
        returns (uint256)
    {
        return transactionCount;
    }
}