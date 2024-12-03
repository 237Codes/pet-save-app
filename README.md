## Project Name: Pet-Save
## Project Contributors
<ol>
 <li>Manyaka Anjorin</li>
 <li>Iyanuoluwa Joanna Ahmed </li>
  <li>Fatima Malik</li>
 <li>Mamata Thapa</li>
 <li>Tayyab Ali</li>
</ol>

## Brief Description
A Pet Save Platform which is a community-driven app where users can report lost and found pets, helping reunite them with their owners. Users can upload photos, and last seen location, and the platform uses AI to classify pets by species and estimate their weight and breed. The app also provides a matching system that suggests potential connections between lost and found pets based on image analysis. Users earn rewards for reporting pets and successfully helping to reunite them with their owners, incentivizing engagement. The platform aims to streamline the process of finding lost pets and offering assistance.

 

## Core Features:

### Report Lost Pets:
1. Users can submit reports of their lost pets, including photos, and last known location
2. The system stores these reports and makes them available for viewing by others.
### Report Found Pets:
1. Users who find a pet can upload details and photos of the animal, including where they found the pet.
2. The platform uses AI to classify the pet by species and estimate the breed and weight.
### AI-Driven Pet Classification:
1. We'll integrate an AI service that can classify pets based on images uploaded by users, estimating their species, breed, and approximate weight.
2. This will improve the accuracy of matching found pets with lost pet reports.
### Reward System:
1. Users earn points for every pet they report as lost or found, and additional rewards if they help reunite a lost pet with its owner.
### Community Engagement:
1. A public feed of lost and found pets to promote visibility.
Users can search for pets based on location, breed, or other attributes.
### Dashboard to visualize pets found and total reports over time.

## User Flow:

### Lost Pet Submission:
1. User uploads a photo, and enters location.
2. AI analyzes the image to classify the pet and provide further data for the report.
### Found Pet Submission:
1. User uploads a photo of the found pet and adds details.
2. The AI attempts to match this found pet with any existing lost pet reports based on the uploaded image, breed, and weight.
### Reward System:
1. Users earn points for reporting pets and additional rewards for helping reunite lost pets with owners.
2. A leaderboard or achievement system can further incentivize users.
### Account Authentication:
1. A user can log in, sign up, or continue as a guest.
2. Once authenticated, users can manage their account settings, including updating their email and changing their password.

### A script to install all the necessary packages. 
This script explains how you can use this project in your local system. There are some important libraries/packages and dependencies which need to be installed. 

### Step1:  
Install visual studio 
Then you need to clone this project from GitHubtHub locally ton your device.

### Step 2:
You need to create some API keys by yourself and add those links in .env file so make sure all module will perfom well. 

### Some important platforms for KEYs needed. 
Gemini API 
Google Map API 
Neon project linking key 
Web3Auth 

### Then you need to open your terminal on visual studio and use the command “npm install’ it will automatically install all the dependencies in your system. In case these do not work you can run and install the necessary packages one by one by following this manual. 

First use need to install Next.js by using this command on the terminal to install. 

Command:  

npm install 

npm install next@latest 

npm install next react react-dom 

Then use the Command to run project on localhost to see the web view. 

Command:  

	npm run dev 

Also you need to install the Drizzle ORM database setup in the project. And neon database setup for using the postgreSQL database. 

Command: 

	npm install drizzle-kit --save-dev 

npm install pg @neondatabase/serverless 

 
If you make any changes on data base you need to update it. 

Command:  

	npm run db:push 

 
 
