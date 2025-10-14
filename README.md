# NexusNTU

## Overview

NexusNTU is an all-in-one web application designed to be a comprehensive digital companion for international students at Nanyang Technological University (NTU). The project aims to solve the problem of a fragmented and inefficient onboarding process by centralizing essential information and services into a single, user-friendly platform. This includes campus navigation, access to university resources, AI-powered support, and personalized content hubs to help students integrate smoothly into university life.

## Features

User Registration and Profile Management: Allows users to create an account, manage their profile information, and personalize services. <br>

Currency Converter: Provides currency exchange information between SGD and the currency of the user's home country.<br>

Navigation and Amenities Finder: Offers detailed route information via public transport and locates nearby amenities like MRT stations, bus stops, eateries, shops, and hospitals.<br>

News Viewer: Delivers a personalized news feed to keep users informed about the latest happenings in Singapore or their home country.<br>

AI Chatbot: Answers user queries, providing an interactive and helpful resource for information.<br>

## Directory Structure

```plaintext
Nexus/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── contexts/
│       ├── pages/
│       ├── styles/
│       ├── utils/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── responsive.css
│       └── tailwind.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── controllers/
├── db/
├── middleware/
├── models/
├── routes/
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

## Setup instructions

Clone the directory.

After that, create 3 terminals using Split Terminal command ( we will refer to them henceforth as T1, T2 and T3)

In T1, run this code-:

```
sudo npm install
```

In T2, run this code-:

```
cd client
sudo npm install
```

In T3, run this code-:

```
cd client/src/pages/Bot/geminichat
pip install -r requirements.txt
streamlit run 1_Gemini_Pro.py
```

This will immediately launch the Gemini chatbot in your browser. You can close the tab and return to the terminal

Run this below code segment for setting up Redis server in PC terminal (not IDE terminal)

```
brew update
brew install redis
brew services start redis
redis-cli ping
```

After running "redis-cli ping" command you will get a PONG response which confirms that the Redis server has successfully started.

Back to T1, run this code-:

```
sudo node app.js
```

This command may give some errors of some node modules not getting located. In such a scenario, simply delete the node_modules directory in the Source Code directory and rerun this command-:

```
sudo npm install
sudo node app.js
```

The command can be considered to be successful once you get this response in T1-:

```plaintext
Server is listening on port 3000
```

(You can ignore any other warnings in T1 that may come along with this response)

Then in T2, run this code-:

```
sudo npm run dev
```

The command can be considered to be successful once you get this response in T2-:

```plaintext
> react-app@0.0.0 dev<br>
> vite


  VITE v5.2.4  ready in 339 ms

  ➜  Local:   http://localhost:5173/ <br>
  ➜  Network: use --host to expose<br>
  ➜  press h + enter to show help<br>
```

(You can ignore any other warnings in T2 that may come along with this response)

### Next, copy this URL "http://localhost:5173/" in your browser address bar and the App (hosted on localhost) will be successfully running with the Landing page visible

## Appendix

API Documentations and Source of API keys/Configuration credentials-:

Mongodb-: https://www.mongodb.com/cloud/atlas/register?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general_prosp-brand_gic-null_apac-sg_ps-all_desktop_eng_lead&utm_term=mongo%20database&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=7854364247&adgroup=81978310976&cq_cmp=7854364247&gad_source=1&gclid=Cj0KCQjw5cOwBhCiARIsAJ5njubc1O2i4Kgp3TEFhi7aDbnvPdH22XjA5FeL6UVEwgTItIjvJRji1zQaAksMEALw_wcB

AWS S3-: https://aws.amazon.com/pm/serv-s3/?gclid=Cj0KCQjw5cOwBhCiARIsAJ5njubaxT1o6P0QCLALESeQJ3ACpZIkDEHiF2u-OfBIxfUqgMQyenVFeYkaArYnEALw_wcB&trk=55ffcfa3-95d3-4418-9a79-62a64040b867&sc_channel=ps&ef_id=Cj0KCQjw5cOwBhCiARIsAJ5njubaxT1o6P0QCLALESeQJ3ACpZIkDEHiF2u-OfBIxfUqgMQyenVFeYkaArYnEALw_wcB:G:s&s_kwcid=AL!4422!3!536452732958!e!!g!!aws%20s3!11543056249!112002966709

Firebase API-: https://firebase.google.com/

Google Places API-: https://developers.google.com/maps/documentation/places/web-service/overview

Gemini API-: https://ai.google.dev/?gad_source=1&gclid=Cj0KCQjw5cOwBhCiARIsAJ5njuboxAVXySbu3orKNUolbT1A7EUjHwLbAZStb3QeF78IeOePkmyYpvwaAkcZEALw_wcB

News API-: https://newsapi.org/

Currency-converter API-: https://rapidapi.com/airaudoeduardo/api/currency-converter241

### Prepared by Team CtrlAltElite at Nanyang Technological University for course SC3040 Advanced Software Engineering
