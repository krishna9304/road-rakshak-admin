# Road Rakshak Admin Dashboard

This is the admin dashboard of the frontend application [Road Rakshak](https://github.com/krishna9304/road-rakshak/). The deployed version of the application is live on vercel --- [https://road-rakshak-admin.vercel.app/](https://road-rakshak-admin.vercel.app/).

### This is one of the three components of the project. Following are all the components of the project
- [Road Rakshak User Application](https://github.com/krishna9304/road-rakshak/)
- [Admin Dashboard](https://github.com/krishna9304/road-rakshak-admin/)
- [Road Rakshak Server](https://github.com/krishna9304/road-rakshak-server/)

# Setting up the development environment
  1. Clone the repository `$ git clone https://github.com/krishna9304/road-rakshak-admin.git`
  2. Install all the dependencies using command `$ yarn`
  4. Run `$ yarn start`.
  5. The application should start on port 3000. You can visit the application on `http://localhost:3000`
 
# Some screenshots of the application
<img width="1680" alt="Screenshot 2021-10-03 at 9 51 15 AM" src="https://user-images.githubusercontent.com/71918441/135739677-fe898d47-fe63-4b32-b04f-60c7764642db.png">
<img width="1680" alt="Screenshot 2021-10-03 at 9 50 31 AM" src="https://user-images.githubusercontent.com/71918441/135739678-c33adbc6-cc59-4745-96e5-9aec73277a8c.png">
<img width="1680" alt="Screenshot 2021-10-03 at 9 50 48 AM" src="https://user-images.githubusercontent.com/71918441/135739682-2a51cca6-0038-401f-a164-825916e00cc9.png">
<img width="1680" alt="Screenshot 2021-10-03 at 9 50 58 AM" src="https://user-images.githubusercontent.com/71918441/135739686-d6f620ec-c88d-4e77-9a2a-1ab40156cf33.png">

# Features
### 1. Secure Authentication
All the details of the admins are stored securely in our database and the password of every admin is hashed by a hashing algorithm, so, not even us will be able to access other people's account.
### 2. Email verification
Every admin in the portal should verify his/her email to use our services.
### 3. Report verification
Admin will verify the reports based on the severity of the condition. Also, when the hurdles are fixed, the admin can delete the report.
### 4. Post News on a daily basis
Admins can post different sort of articles, blogs or news on the portal so that the users can stay updated.
### 3. Spam free
All the hurdles reported by the users will only get uploaded to the map, only when they are verified by the admin. So there are no chances of spam. Also, all the accounts on the portal are verified through email.

# Technologies Used
  - [React.JS](https://reactjs.org/)
  - [Redux.JS](https://redux.js.org/)
  - [Ant Design](https://ant.design/)
  - [Tailwind CSS](https://tailwindcss.com/)
