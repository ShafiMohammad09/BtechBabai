// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyAIi0Qlg3-wbuaPXUQFPl2YtpeDqPRnT-Q",
  apiKey: "import.meta.env.VITE_FIREBASE_API_KEY",
  authDomain: "import.meta.env.VITE_FIREBASE_AUTH_DOMAIN",
  databaseURL: "import.meta.env.VITE_FIREBASE_DATABASE_URL",
  projectId: "import.meta.env.VITE_FIREBASE_PROJECT_ID",
  storageBucket: "import.meta.env.VITE_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID",
  appId: "import.meta.env.VITE_FIREBASE_APP_ID",
  measurementId: "import.meta.env.VITE_FIREBASE_MEASUREMENT_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Retrieve URL parameters
const urlParams = new URLSearchParams(window.location.search);
const college = urlParams.get('college');
const semester = urlParams.get('semester');
const branch = urlParams.get('branch');

// Fetch data from Firebase
fetchData(college, semester, branch);

function fetchData(college, semester, branch) {
  const path = `${college}/${branch}/${semester}`;
  const dbRef = database.ref(path);

  dbRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      displayResults(data);
    } else {
      console.log("No data available for this selection");
      displayNoResults();
    }
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
}

// Function to display results
function displayResults(data) {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = ''; // Clear previous results
  
  data.forEach(item => {
    const resultHTML = `
              <div class="rounded-lg border bg-gray-900 text-white p-4 shadow-sm">
                <h3 class="text-2xl font-bold mb-2">${item.subject}</h3>
                <p class="mb-2">Previous Year:<a href="${item.pdfUrl}" class="text-blue-400" target="_blank">Download</a></p>
                <p class="mb-2">Chapter 1 <a href="${item.chap1}" class="text-blue-400" target="_blank">Download</a></p>
                <p class="mb-2">Chapter 2 <a href="${item.chap2}" class="text-blue-400" target="_blank">Download</a></p>
                <p class="mb-2">Chapter 3 <a href="${item.chap3}" class="text-blue-400" target="_blank">Download</a></p>
                <p class="mb-2">Chapter 4 <a href="${item.chap4}" class="text-blue-400" target="_blank">Download</a></p>
                <p class="mb-2">Chapter 5 <a href="${item.chap5}" class="text-blue-400" target="_blank">Download</a></p>
                <p>YouTube Playlist: <a href="${item.youtubePlaylist}" class="text-blue-400" target="_blank">Watch</a></p>
              </div>`;
    resultsContainer.innerHTML += resultHTML;
  });
}

// Function to display no results
function displayNoResults() {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '<p class="text-xl text-gray-300">No results found for the selected options.</p>';
}
