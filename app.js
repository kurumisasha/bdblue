document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    const voucherDetails = document.getElementById('voucherDetails');
    const cardNumberInput = document.getElementById('cardNumber');

    generateButton.addEventListener('click', function () {
        const cardNumber = cardNumberInput.value.trim();

        if (!cardNumber) {
            alert('Please enter a card number');
            return;
        }

        // Simulate API call to fetch voucher details
        fetchVoucherDetails(cardNumber);
    });

    function fetchVoucherDetails(cardNumber) {
        const url = `https://api.teeg.cloud/vouchers/campaigns/AHSARGA/cards/${cardNumber}?tz=BEBNLI9HO7`;
        const accessToken = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imp0X1htek9Od2NqTlg0VFhjTjRvMUhNM2k5aUtpczlpSGgxYTllcEdENGsiLCJ0eXAiOiJKV1QifQ...';  // Add your full access token here

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Display voucher details
                voucherDetails.innerHTML = `
                    <p><strong>Voucher Code:</strong> ${data.voucher_code}</p>
                    <p><strong>Amount:</strong> ${data.amount}</p>
                    <p><strong>Expiry Date:</strong> ${data.expiry_date}</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching voucher details:', error);
                voucherDetails.innerHTML = '<p>Failed to fetch voucher details. Please check the card number or try again later.</p>';
            });
    }
});
