// Bank Class
var Bank = /** @class */ (function () {
    function Bank(name) {
        this.name = name;
        this.branches = [];
    }
    Bank.prototype.addBranch = function (branch) {
        if (!this.branches.includes(branch)) {
            console.log("This ".concat(branch.getName(), " is added to the barnches successfuly."));
            this.branches.push(branch);
            return true;
        }
        else {
            console.log("This ".concat(branch.getName(), " is already exist."));
            return false;
        }
    };
    Bank.prototype.addCustomer = function (branch, customer) {
        if (this.checkBranch(branch)) {
            console.log("".concat(customer.getName(), " is added successfuly."));
            return branch.addCustomer(customer);
        }
        else {
            console.log("Can't add ".concat(customer.getName(), ". Please try again"));
            return false;
        }
    };
    Bank.prototype.addCustomerTransaction = function (branch, customerId, amount) {
        if (this.checkBranch(branch)) {
            console.log("Your transaction is successful.");
            return branch.addCustomerTransaction(customerId, amount);
        }
        else {
            console.log("Your transaction is unsuccessful.");
            return false;
        }
    };
    // returns array or null
    Bank.prototype.findBranchByName = function (branchName) {
        var findBranch = this.branches.filter(function (branch) { return branch.getName() === branchName; });
        return findBranch.length > 0 ? findBranch : null;
    };
    // returns boolean
    Bank.prototype.checkBranch = function (branch) {
        return this.branches.includes(branch);
    };
    Bank.prototype.listCustomers = function (branch, includeTransactions) {
        console.log("Customers of ".concat(this.name, " - ").concat(branch.getName(), ":"));
        branch.getCustomers().forEach(function (customer) {
            console.log("Customer Name: ".concat(customer.getName()));
            if (includeTransactions) {
                console.log("Transactions:");
                customer.getTransactions().forEach(function (transaction, index) {
                    console.log("    ".concat(index + 1, ". Amount: $").concat(transaction.amount, ", Date: ").concat(transaction.date));
                });
            }
        });
    };
    return Bank;
}());
// Branch Class
var Branch = /** @class */ (function () {
    function Branch(name) {
        this.name = name;
        this.customers = [];
    }
    // This method returns a string data type:
    Branch.prototype.getName = function () {
        return this.name;
    };
    // This method returns Array
    Branch.prototype.getCustomers = function () {
        return this.customers;
    };
    // This method returns Blooean
    Branch.prototype.addCustomer = function (customer) {
        if (!this.customers.includes(customer)) {
            this.customers.push(customer);
            return true;
        }
        else {
            return false;
        }
    };
    // This method return Boolean
    // This method still needs some work
    Branch.prototype.addCustomerTransaction = function (customerId, amount) {
        var customer = this.customers.find(function (i) { return i.getId() === customerId; });
        if (customer) {
            return customer.addTranscations(amount);
        }
        else {
            return false;
        }
    };
    return Branch;
}());
// Customer Class
var Customer = /** @class */ (function () {
    function Customer(name, id) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    // Returns string
    Customer.prototype.getName = function () {
        return this.name;
    };
    // returns number
    Customer.prototype.getId = function () {
        return this.id;
    };
    // returns array
    Customer.prototype.getTransactions = function () {
        return this.transactions;
    };
    //returns number + Note: The balance cannot be negative.
    Customer.prototype.getBalance = function () {
        return this.transactions.reduce(function (total, transaction) { return total + transaction.amount; }, 0);
    };
    // returns boolean
    // This method stills need some work.
    Customer.prototype.addTranscations = function (amount) {
        var date = new Date();
        if (amount > 0) {
            this.transactions.push(new Transaction(amount, date));
            return true;
        }
        else {
            return false;
        }
    };
    return Customer;
}());
// Transaction Class
var Transaction = /** @class */ (function () {
    function Transaction(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Transaction;
}());
var arizonaBank = new Bank("Arizona");
var westBranch = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer1 = new Customer("John", 1);
var customer2 = new Customer("Anna", 2);
var customer3 = new Customer("Shahad", 3);
console.log('_______________________________________________________________');
console.log('_________________________Add Branch__________________________');
console.log(arizonaBank.addBranch(westBranch));
console.log(arizonaBank.addBranch(sunBranch));
console.log(arizonaBank.addBranch(westBranch));
console.log('_______________________________________________________________');
console.log('_________________________Find Branch___________________________');
console.log(arizonaBank.findBranchByName("bank"));
console.log(arizonaBank.findBranchByName("sun"));
console.log('_______________________________________________________________');
console.log('_________________________Add Customer__________________________');
console.log(arizonaBank.addCustomer(westBranch, customer1));
console.log(arizonaBank.addCustomer(westBranch, customer3));
console.log(arizonaBank.addCustomer(sunBranch, customer1));
console.log(arizonaBank.addCustomer(sunBranch, customer2));
console.log('_______________________________________________________________');
console.log('__________________Add Customer Transacation____________________');
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000));
console.log('_______________________________________________________________');
console.log('_____________Unsuccessful tansaction & Balance_________________');
console.log(customer1.addTranscations(-1000));
console.log(customer1.getBalance());
console.log('_______________________________________________________________');
console.log('__________________Customers List (westBranch)__________________');
console.log(arizonaBank.listCustomers(westBranch, true));
console.log('_______________________________________________________________');
console.log('__________________Customers List (sunBranch)___________________');
console.log(arizonaBank.listCustomers(sunBranch, true));
