if ('NDEFReader' in window) {
  const reader = new NDEFReader();
  
  // Handle errors
  reader.onerror = (event) => {
    console.log(event);
  };
  
  // Handle successful scans
  reader.onreading = (event) => {
    console.log(event.message);
    
    // Extract data from the message and determine if the food is fresh or not
    const data = event.message.records[0].data;
    const dateString = new TextDecoder().decode(data);
    const expirationDate = new Date(dateString);
    const currentTime = new Date();
    const differenceInSeconds = (expirationDate - currentTime) / 1000;
    
	const h1 = document.querySelector('h1');
    if (differenceInSeconds <= 10) {
      h1.textContent = "Food is fresh!";
      h1.style.color = "green";
    } else {
      h1.textContent = "Food is fresh!";
      h1.style.color = "green";
    }
  };
  
  // Start scanning when the button is clicked
  const scanButton = document.getElementById('scan-button');
  scanButton.addEventListener('click', async () => {
    try {
      await reader.scan();
    } catch (error) {
      console.log(error);
    }
  });
  
  // Start the timer when the page is loaded
  startTimer();
  
  // Reset the timer when the user interacts with the page
  document.addEventListener('mousemove', resetTimer);
  document.addEventListener('keypress', resetTimer);
  
  // Timer functions
  function startTimer() {
    timer = setTimeout(() => {
		const h1 = document.querySelector('h1');
      h1.textContent = "Food is not fresh!";
      h1.style.color = "red";
    }, 5000);
  }
  
  function resetTimer() {
    clearTimeout(timer);
    startTimer();
  }
  
} else {
	const h1 = document.querySelector('h1');
  console.log("NFC not supported by the browser");
  h1.textContent = "NFC not supported by the browser";
      h1.style.color = "red";
}


