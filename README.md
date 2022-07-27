# Prosprr

## TODO

- Install the dependencies using `npm i`
- Sync the ionic with android using `ionic capacitor sync android`
- This will create `/android` directory having the android project.
- Required permissions needs to be added in the AndroidManifest.xml file, which is located at `android/app/src/main/AndroidManifest.xml`
  - File storage and read permission

  ```
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  ```

- Start the app in android using `ionic capacitor run android -l --external`
- This will start the Android Studio and once the process is finished, it can be started from there.
- Command for generating resources `cordova-res android --skip-config --copy` link(https://capacitorjs.com/docs/guides/splash-screens-and-icons)