const axios = require('axios');

const API_URL = 'http://localhost:5000/api/v1';

const testAccounts = [
  // Undergraduate Students
  {
    email: 'cse.student@example.com',
    password: 'password123',
    role: 'undergraduate',
    branch: 'Computer Science and Engineering'
  },
  {
    email: 'mech.student@example.com',
    password: 'password123',
    role: 'undergraduate',
    branch: 'Mechanical Engineering'
  },
  {
    email: 'ee.student@example.com',
    password: 'password123',
    role: 'undergraduate',
    branch: 'Electrical Engineering'
  },
  {
    email: 'ece.student@example.com',
    password: 'password123',
    role: 'undergraduate',
    branch: 'Electronics and Communication Engineering'
  },
  {
    email: 'civil.student@example.com',
    password: 'password123',
    role: 'undergraduate',
    branch: 'Civil Engineering'
  },
  // Pre-University Students
  {
    email: 'preuni.student1@example.com',
    password: 'password123',
    role: 'pre-university',
    branch: null
  },
  {
    email: 'preuni.student2@example.com',
    password: 'password123',
    role: 'pre-university',
    branch: null
  },
  {
    email: 'preuni.student3@example.com',
    password: 'password123',
    role: 'pre-university',
    branch: null
  }
];

async function createTestAccounts() {
  console.log('Creating test accounts...\n');
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const account of testAccounts) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, account);
      console.log(`✓ Created: ${account.email} (${account.role}${account.branch ? ' - ' + account.branch : ''})`);
      successCount++;
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error === 'User already exists') {
        console.log(`⊘ Skipped: ${account.email} (already exists)`);
        skipCount++;
      } else {
        console.log(`✗ Error: ${account.email} - ${error.response?.data?.error || error.message}`);
        errorCount++;
      }
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('SUMMARY:');
  console.log(`  ✓ Created: ${successCount}`);
  console.log(`  ⊘ Skipped (already exist): ${skipCount}`);
  console.log(`  ✗ Failed: ${errorCount}`);
  console.log('═══════════════════════════════════════════════════════════\n');

  if (successCount > 0 || skipCount > 0) {
    console.log('All test accounts are ready to use!');
    console.log('Login at: http://localhost:3000/login');
    console.log('See TEST_CREDENTIALS.txt for login details.\n');
  }
}

// Check if backend is running first
console.log('Checking if backend server is running...');
axios.get(`${API_URL}/degrees`)
  .then(() => {
    console.log('✓ Backend server is running.\n');
    return createTestAccounts();
  })
  .catch((error) => {
    console.error('✗ Error: Cannot connect to backend server on port 5000');
    console.error(`  ${error.message}`);
    console.error('\n  Please make sure:');
    console.error('  1. Backend server is running: cd backend && npm start');
    console.error('  2. MongoDB is connected');
    console.error('  3. Port 5000 is not blocked\n');
    process.exit(1);
  });
