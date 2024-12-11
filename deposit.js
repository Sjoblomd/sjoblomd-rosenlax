function moneyDeposit() {
    const depositInput = document.getElementById("deposit").value.trim();
    const standardInput = depositInput.replace(".", ",");
    const depositAmount = parseFloat(standardInput);

    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    const accountBalance = parseFloat(localStorage.getItem('depositAmount')) || 0;

    const accountTotalBalance = accountBalance + depositAmount;

    localStorage.setItem('depositAmount', accountTotalBalance);

    const totalBalanceElement = document.getElementById("account-balance");
    totalBalanceElement.textContent = `Account Balance: ${accountTotalBalance} €`;

    alert(`You have deposited: ${depositAmount} € Total balance is: ${accountTotalBalance}`);
}
window.onload = function () {
    const totalBalance = parseFloat(localStorage.getItem('depositAmount')) || 0;
    const totalBalanceElement = document.getElementById("account-balance");
    totalBalanceElement.textContent = `Account Balance: ${totalBalance} €`;
};