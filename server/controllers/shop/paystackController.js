import https from 'https';
import dotenv from "dotenv";

dotenv.config();


// Initialize Transaction
export const initializeTransaction = (req, res) => {
  const { email, amount } = req.body;

  const params = JSON.stringify({
    email,
    amount: amount * 100, // Paystack expects the amount in kobo (smallest unit)
  });

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Use your Paystack secret key
      'Content-Type': 'application/json',
    },
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const responseData = JSON.parse(data);
      if (responseData.status) {
        res.status(200).json({
          status: 'success',
          message: 'Transaction initialized',
          data: responseData.data,
        });
      } else {
        res.status(400).json({
          status: 'error',
          message: 'Failed to initialize transaction',
        });
      }
    });
  });

  request.on('error', (error) => {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  });

  request.write(params);
  request.end();
};

// Verify Transaction
export const verifyTransaction = (req, res) => {
  const { reference } = req.params;

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/transaction/verify/${reference}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const responseData = JSON.parse(data);
      if (responseData.data.status === 'success') {
        res.status(200).json({
          status: 'success',
          message: 'Transaction verified',
          data: responseData.data,
        });
      } else {
        res.status(400).json({
          status: 'error',
          message: 'Transaction verification failed',
        });
      }
    });
  });

  request.on('error', (error) => {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  });

  request.end();
};
