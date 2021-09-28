const LINKEDIN_BASE_URL = 'https://www.linkedin.com';
const LINKEDIN_API_URL = `${LINKEDIN_BASE_URL}/voyager/api`;

const AIRTABLE_API_URL = "https://api.airtable.com/v0/appTZexPXpkZv2hLx";
const AIRTABLE_API_KEY = "keyCfydEMoBPBkBij";

const AIRTABLE_PROFILES_TABLE = `${AIRTABLE_API_URL}/Profils`;

const ACTIONS = {
    ADD_PUBLIC_PROFILE: 'add-public-profile',
    ADD_RECRUITER_PROFILE: 'add-recruiter-profile',
};

chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
      if (changeInfo.url) {
        console.log("url: ", changeInfo.url);  

        var patt = new RegExp("https:\/\/www.linkedin.com\/talent\/hire\/.+\/discover\/applicants\/profile\/.+");
        var res = patt.test(changeInfo.url);
        
        console.log("match: ", res);

        if (res) {
            chrome.tabs.sendMessage( tabId, {
                message: 'scrape',
                url: changeInfo.url
            })
        }
      }
    }
  );

chrome.runtime.onMessage.addListener(message => {
   switch (message.action) {
       case ACTIONS.ADD_PUBLIC_PROFILE:
           console.log("Adding public profile...");

           (async () => await handleAddPublicProfile(message.data.profileId))();       
           return true;

        case ACTIONS.ADD_RECRUITER_PROFILE:
           console.log("Adding recruiter profile...");

           (async () => await handleAddRecruiterProfile(message.data))();       
           return true;
   }  
});

const getCsrfToken = (jsessionId) => {
    if (jsessionId === undefined || jsessionId.length == 0)
        return undefined;

    if (jsessionId.startsWith("\""))
        return jsessionId.substr(1, jsessionId.length - 2) ?? undefined;

    return jsessionId.substr(0, jsessionId.length) ?? undefined;
}

const getJSessionId = (url, name) => {
    return new Promise((resolve, reject) => {
        chrome.cookies.get(
            {
                "url": url,
                "name": name
            },
            cookie => {
                if (cookie)
                    resolve(cookie.value);
                else
                    reject("Cant't get jsessionid");
            }
        )
    })
}

const handleResponse = (response) => {
    return response.text().then(textResponse => {
        const jsonResponse = textResponse && JSON.parse(textResponse);

        return !response.ok ? 
            {
                isSucceeded: response.ok,
                statusCode: response.status
            } :
            {
                isSucceeded: response.ok,
                statusCode: response.status,
                data: jsonResponse
            };
    });
}

const airtableAPIRequest = async (endpoint, method, body = null) =>
    handleResponse(await fetch(endpoint, {
        method: method,
        headers: { 
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body && JSON.stringify(body)
    }));

const voyagerAPIRequest = async (endpoint, headers = {}) => {
    let jsessionid = await getJSessionId(LINKEDIN_BASE_URL, 'JSESSIONID');

    csrfToken = getCsrfToken(jsessionid);

    let response = await fetch(
        endpoint,
        {
            headers: {
                'csrf-token': csrfToken,
                ...headers
            },
            credentials: 'include'
        });

    return await response.json();
}

const getProfile = async (publicIdentifier = null, urn = null) =>
    await voyagerAPIRequest(`${LINKEDIN_API_URL}/identity/profiles/${publicIdentifier || urn}/profileView`);

const handleAddPublicProfile = async (profileId) => {
    const profile = await getProfile(profileId);
    
    console.log("profile: ", profile);

    // const profilesTable = await airtableAPIRequest(`${AIRTABLE_API_URL}/Profils`, 'GET');

    // console.log("Profiles Table: ", profilesTable);
}

const handleAddRecruiterProfile = async (recruiter) => {
    const recruiterPublicProfile = await getProfile(recruiter.profileUrn);
    const publicIdentifier = recruiterPublicProfile?.profile?.miniProfile?.publicIdentifier;

    recruiter = { 
        ...recruiter, 
        "profileUrl": `https://www.linkedin.com/in/${publicIdentifier}/` 
    };
    
    console.log("recruiter: ", recruiter);

    const response = await airtableAPIRequest(
        AIRTABLE_PROFILES_TABLE, 
        'POST', 
        {
            "fields": {
                "Nom": recruiter.fullName,
                "Téléphone": recruiter.contactPhone,
                "Email": recruiter.email,
                "Acquisition": "Annonce Linkedin",
                "Profil" : recruiter.project,
                "Linkedin URL": recruiter.profileUrl,
                "Statut": "SMS à envoyer",
                "Commentaires": "Add from Linkedin auto",
                "Owner": recruiter.owner
            }
        });

    console.log(response);
}
