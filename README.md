# Informatinder API
  * [Installation](#installation)
  * [User-API](#user-api)
    * [Login](#login-user)
    * [Register](#register-user)
    * [Get One User](#get-one-user)
    * [Get All Users](#get-all-users)
    * [Update User](#update-user)
    * [Delete User](#delete-user)
  * [Profile-API](#profile-api)
    * [Get One Profile](#get-one-profile)
    * [Get All Profiles](#get-all-profiles)
    * [Update Profile](#update-profile)
    * [Upload Image](#upload-image)
    * [Delete Profile](#delete-profile)
  * [Swipe-API](#swipe-api)
    * [Get Profiles By Page](#get-profiles-by-page)
  * [Matches-API](#matches-api)
    * [Get Matches](#get-matches)
    * [Like Match](#like-match)
    * [Dislike Match](#dislike-match)
  * [Future-API](#future-api)
    * [Get Settings](#get-settings)
    * [Set Settings](#set-settings)

# Installation

  * `cd` into directory
  * `npm i`
  * crate a `.env` file and fill it with the example entries
  * `npm run start` for starting the server
  * `npm run dev` for starting the development live server
  * `npm test` for testing
  

# User API
  **Login User**
  ----
  Returns token and data about the signed in User.

  * **URL:**
    /user/auth/login

  * **Method:**
    `POST`
    
  *  **URL Params:**
      None

  * **Data Params:**
   `{ email, password }`
      

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ token, user }`
  
  * **Error Response:**

    * **Code:** 400 <br />
      **Content:** `{ error : "No user with the email." }`

    OR

    * **Code:** 401 <br />
      **Content:** `{ error : "Bad credentials." }`

  * **Sample Call:**

    ```javascript
      const login = (formData) => API.post('/user/auth/login', formData);
    ```

<hr />
  
  **Register User**
  ----
  Tries to register the user with the formdata

  * **URL:**
    /user/auth/register

  * **Method:**
    `POST`
    
  *  **URL Params:**
      None

  * **Data Params:**

    * **Content:** `{ username, email, password, confirmPassword, isBetrieb }`
      
  * **Success Response:**

    * **Code:** 201 <br />
      **Content:** `{ token, user, profile }`
  
  * **Error Response:**

    * **Code:** 400 <br />
      **Content:** `{ error : "User already exists. }`

    OR

    * **Code:** 400 <br />
      **Content:** `{ error : "No valid email address." }`

  * **Sample Call:**

    ```javascript
      const register = (formData) => API.post('/user/auth/register', formData);
    ```
<hr />

  **Get One User**
  ----
  Returns a specific User

  * **URL:**
    /user/:id

  * **Method:**
    `GET`
    
  *  **URL Params:**
      `id=[integer]`

  * **Data Params:**
    None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ user }`
  
  * **Error Response:**

    * **Code:** 404 <br />
      **Content:** `{ error : "No User with given id }`

  * **Sample Call:**

    ```javascript
      const getUser = (id) => API.get(`/user/${id}`);
    ```
<hr/>

  **Get All Users**
  ----
  Returns all User

  * **URL:**
    /user/

  * **Method:**
    `GET`
    
  *  **URL Params:**
      None

  * **Data Params:**
      None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ user }`
  
  * **Error Response:**

    * **Code:** 404 <br />
      **Content:** `{ error : "No User with given id }`

  * **Sample Call:**

    ```javascript
      const getAllUser = () => API.get(`/user/`);
    ```
<hr/>

  **Update User**
  ----
  Updated a specific User

  * **URL:**
    /user/:id

  * **Method:**
    `PATCH`
    
  *  **URL Params:**
      `id=[integer]`

  * **Data Params:**
  
    * **Content:** `{ username, email, password }`

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ user }`
  
  * **Error Response:**

    * **Code:** 404 <br />
      **Content:** `{ error : "No User found.}`

    OR

    * **Code:** 400 <br />
      **Content:** `{ error : "Unique violation." }`

  * **Sample Call:**

    ```javascript
      const updateUser = (id, formdata) => API.patch(`/user/${id}`, formdata);
    ```
<hr/>

  **Delete User**
  ----
  Deletes a specific User

  * **URL:**
    /user/:id

  * **Method:**
    `DELETE`
    
  *  **URL Params:**
      `id=[integer]`

  * **Data Params:**
    None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `User deleted.`
  
  * **Error Response:**

    * **Code:** 404 <br />
      **Content:** `{ error : "No User found }`

  * **Sample Call:**

    ```javascript
      const deleteUser = (id) => API.delete(`/user/${id}`);
    ```
<hr/>

# Profile API

  **Get One Profile**
  ----
  Returns a specific Profile

  * **URL:**
    /profile/:id

  * **Method:**
    `GET`
    
  *  **URL Params:**
      `id=[integer]`

  * **Data Params:**
    None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ profile: {..., Categories, Benefits, Languages} }`
  
  * **Error Response:**

    * **Code:** 404 <br />
      **Content:** `{ error : "No Profile with given id. }`

  * **Sample Call:**

    ```javascript
      const getProfile = (id) => API.get(`/profile/${id}`);
    ```
<hr/>

  **Get All Profiles**
  ----
  Returns all Profiles

  * **URL:**
    /profile/

  * **Method:**
    `GET`
    
  *  **URL Params:**
      None

  * **Data Params:**
      None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ profiles: [profile: {..., Categories, Benefits, Languages}] }`
  
  * **Error Response:**

    * **Code:** 500 <br />
      **Content:** `{error: "500 - Server error"}`

  * **Sample Call:**

    ```javascript
      const getAllProfiles = () => API.get(`/profile/`);
    ```
<hr/>

  **Update Profile**
  ----
  Updated a Profile

  * **URL:**
    /profile/:id

  * **Method:**
    `PATCH`
    
  *  **URL Params:**
      `id=[integer]`

  * **Data Params:**
  
    * **Content:** `{ name, description, website, languages, categories, benefits, contact }`

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ user }`
  
  * **Error Response:**

    * **Code:** 404 <br />
      **Content:** `{ error : "No Profile with given id }`

  * **Sample Call:**

    ```javascript
      let types = {
        name: String,
        description: String,
        website: String,
        languages: Map<String, Int>,
        categories: [String],
        benefits: [String],
        contact: String
      }
      const updateProfile = (id, formdata) => API.patch(`/profile/${id}`, formdata);
    ```
<hr/>

  **Upload Image**
  ----
  Upload an Image to a profile

  * **URL:**
    /profile/image

  * **Method:**
    `POST`
    
  *  **URL Params:**
      None

  * **Data Params:**
  
    * **Content:** Image as `jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF`

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ success: true}`
  
  * **Error Response:**

    * **Code:** 400 <br />
      **Content:** `{ error : "..." }`

  * **Sample Call:**

    ```javascript
      const uploadImage = (image) => API.post(`/profile/image`, image);
    ```
<hr/>

  **Delete Profile**
  ----
  Deletes a Profile

  * **URL:**
    /profile/:id

  * **Method:**
    `DELETE`
    
  *  **URL Params:**
      `id=[integer]`

  * **Data Params:**
    None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `Profile deleted.`
  
  * **Error Response:**

    * **Code:** 404 <br />
      **Content:** `{ error : "No Profile with given id }`

  * **Sample Call:**

    ```javascript
      const deleteProfile = (id) => API.delete(`/profile/${id}`);
    ```
<hr/>

# Swipe API
    In the future the swipe api should provide the client with profiles they might like according to the match algorithm.
  **Get Profiles By Page**
  ----
  Returns a given count from a page within all profiles

  * **URL:**
    /swipe/:page/:count

  * **Method:**
    `GET`
    
  *  **URL Params:**
    `page=[integer] & count=[integer]`

  * **Data Params:**
    None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ profiles: [profile: {..., Categories, Benefits, Languages}], count }`
  
  * **Error Response:**

    * **Code:** 404 <br />
      **Content:** `{ error : "No ressources", count }`

  * **Sample Call:**

    ```javascript
      const getProfilesByPage = (page, count) => API.get(`/swipe/${page}/${count}`);
    ```
<hr/>

# Matches API
  **Get Matches**
  ----
  Returns my matches

  * **URL:**
    /matches

  * **Method:**
    `GET`
    
  *  **URL Params:**
    None

  * **Data Params:**
    None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ count, profiles: [profile: {..., Categories, Benefits, Languages}] }`
  
  * **Error Response:**

    * **Code:** 401 <br />
      **Content:** `{ error : "Unauthorized. }`

  * **Sample Call:**

    ```javascript
      const getMatches = () => API.get(`/matches`);
    ```
<hr/>

  **Like Match**
  ----
  Matches you with an other account

  * **URL:**
    /matches/like/:id

  * **Method:**
    `POST`
    
  *  **URL Params:**
    * **Content:** `{ id }`

  * **Data Params:**
    * None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** None
  
  * **Error Response:**

    * **Code:** 400 <br />
      **Content:** `{ error : "You cant match yourself. }`

      OR

    * **Code:** 401 <br />
      **Content:** `{ error : "Unauthorized" }`

  * **Sample Call:**

    ```javascript
      const postMatch = (id) => API.post(`/matches/like/${id}`);
    ```
<hr/>

**Dislike Match**
  ----
  Matches you with an other account

  * **URL:**
    /matches/dislike/:id

  * **Method:**
    `POST`
    
  *  **URL Params:**
    * **Content:** `{ id }`

  * **Data Params:**
    * None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** None
  
  * **Error Response:**

    * **Code:** 401 <br />
      **Content:** `{ error : "Unauthorized" }`

  * **Sample Call:**

    ```javascript
      const postMatch = (id) => API.post(`/matches/dislike/${id}`);
    ```
<hr/>

# Future API

The planned routes will be here.

**Get Settings**
  ----
  Returns this users settings

  * **URL:**
    /settings

  * **Method:**
    `GET`
    
  *  **URL Params:**
    None

  * **Data Params:**
    None

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ settings }`
  
  * **Error Response:**

    * **Code:** 401 <br />
      **Content:** `{ error : "Unauthorized. }`

  * **Sample Call:**

    ```javascript
      const getSettings = () => API.get(`/settings`);
    ```
<hr/>

**Set settings**
  ----
  Post the settings, so its permanent

  * **URL:**
    /settings

  * **Method:**
    `POST`
    
  *  **URL Params:**
    None

  * **Data Params:**
    * **Content:** `{ settings }`

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ settings }`
  
  * **Error Response:**

    * **Code:** 401 <br />
      **Content:** `{ error : "Unauthorized. }`

  * **Sample Call:**

    ```javascript
      const setSettings = (settings) => API.post(`/settings`, {settings});
    ```
<hr/>