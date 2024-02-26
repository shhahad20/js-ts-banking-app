// Bank Class
class Bank {
  name: string;
  branches: Branch[];
  constructor(name: string) {
    this.name = name;
    this.branches = [];
  }
  addBranch(branch: Branch): boolean {
    if (!this.branches.some((branch) => branch.name === branch.name)) {
      console.log(
        `This ${branch.getName()} is added to the barnches successfuly.`
      );
      this.branches.push(branch);
      return true;
    } else {
      console.log(`This ${branch.getName()} is already exist.`);
      return false;
    }
  }
  addCustomer(branch: Branch, customer: Customer): boolean {
    if (this.checkBranch(branch)) {
      console.log(`${customer.getName()} is added successfuly.`);
      return branch.addCustomer(customer);
    } else {
      console.log(`Can't add ${customer.getName()}. Please try again`);
      return false;
    }
  }
  addCustomerTransaction(
    branch: Branch,
    customerId: number,
    amount: number
  ): boolean {
    if (this.checkBranch(branch)) {
      console.log(`Your transaction is successful.`);
      return branch.addCustomerTransaction(customerId, amount);
    } else {
      console.log(`Your transaction is unsuccessful.`);
      return false;
    }
  }
  // returns array or null
  findBranchByName(branchName: string): Branch[] | null {
    const findBranch = this.branches.filter(
      (branch) => branch.getName() === branchName
    );
    return findBranch.length > 0 ? findBranch : null;
  }
  // returns boolean
  checkBranch(branch: Branch): boolean {
    return this.branches.includes(branch);
  }
  listCustomers(branch: Branch, includeTransactions: boolean): void {
    console.log(`Customers of ${this.name} - ${branch.getName()}:`);
    branch.getCustomers().forEach((customer) => {
      console.log(`Customer Name: ${customer.getName()}`);
      if (includeTransactions) {
        console.log("Transactions:");
        customer.getTransactions().forEach((transaction, index) => {
          console.log(
            `    ${index + 1}. Amount: $${transaction.amount}, Date: ${
              transaction.date
            }`
          );
        });
      }
    });
  }
}

// Branch Class
class Branch {
  name: string;
  customers: Customer[];
  constructor(name: string) {
    this.name = name;
    this.customers = [];
  }
  // This method returns a string data type:
  getName(): string {
    return this.name;
  }
  // This method returns Array
  getCustomers(): Customer[] {
    return this.customers;
  }
  // This method returns Blooean
  addCustomer(customer: Customer): boolean {
    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      return true;
    } else {
      return false;
    }
  }
  // This method return Boolean
  // This method still needs some work
  addCustomerTransaction(customerId: number, amount: number): boolean {
    const customer = this.customers.find((i) => i.getId() === customerId);
    if (customer) {
      return customer.addTranscations(amount);
    } else {
      return false;
    }
  }
}

// Customer Class
class Customer {
  name: string;
  id: number;
  transactions: Transaction[];

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }
  // Returns string
  getName(): string {
    return this.name;
  }
  // returns number
  getId(): number {
    return this.id;
  }
  // returns array
  getTransactions() {
    return this.transactions;
  }
  //returns number + Note: The balance cannot be negative.
  getBalance(): number {
    return this.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  }
  // returns boolean
  addTranscations(amount: number): boolean {
    const date: Date = new Date();
    if (amount > 0) {
      this.transactions.push(new Transaction(amount, date));
      return true;
    } else {
      return false;
    }
  }
}

// Transaction Class
class Transaction {
  amount: number;
  date: Date;
  constructor(amount: number, date: Date) {
    this.amount = amount;
    this.date = date;
  }
}

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("Shahad", 3);

console.log("_______________________________________________________________");
console.log("_________________________Add Branch__________________________");
console.log(arizonaBank.addBranch(westBranch));
console.log(arizonaBank.addBranch(sunBranch));
console.log(arizonaBank.addBranch(westBranch));
console.log("_______________________________________________________________");
console.log("_________________________Find Branch___________________________");
console.log(arizonaBank.findBranchByName("bank"));
console.log(arizonaBank.findBranchByName("sun"));
console.log("_______________________________________________________________");
console.log("_________________________Add Customer__________________________");
console.log(arizonaBank.addCustomer(westBranch, customer1));
console.log(arizonaBank.addCustomer(westBranch, customer3));
console.log(arizonaBank.addCustomer(sunBranch, customer1));
console.log(arizonaBank.addCustomer(sunBranch, customer2));
console.log("_______________________________________________________________");
console.log("__________________Add Customer Transacation____________________");
console.log(
  arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000)
);
console.log(
  arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000)
);
console.log(
  arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000)
);
console.log("_______________________________________________________________");
console.log("_____________Unsuccessful tansaction & Balance_________________");
console.log(customer1.addTranscations(-1000));
console.log(customer1.getBalance());
console.log("_______________________________________________________________");
console.log("__________________Customers List (westBranch)__________________");
console.log(arizonaBank.listCustomers(westBranch, true));
console.log("_______________________________________________________________");
console.log("__________________Customers List (sunBranch)___________________");
console.log(arizonaBank.listCustomers(sunBranch, true));
