// Create Variable

var dashboard = document.querySelectorAll(".c-dropdown-item");
var searchProduct = document.querySelector(".search-product");
var user = document.querySelector(".c-user");
var cart = document.querySelector(".c-cart");
var gotoLogin = document.getElementById("c-login");
var gotoSignUp = document.getElementById("c-signup");
var formDataLogin = document.querySelector(".c-login");
var formDataLoginAgain = document.querySelector(".c-login-again");
var formDataSignUp = document.querySelector(".c-signup");
var loginTooglePass = document.getElementById("login-toogle-pass");
var loginTooglePassAgain = document.getElementById("login-toogle-pass-again");
var signUpTooglePass = document.getElementById("signup-toogle-pass");
var signUpToogleRepass = document.getElementById("signup-toogle-repass");
var updateTooglePass = document.getElementById("change-toogle-pass");
var updateToogleRepass = document.getElementById("change-toogle-repass");
var resetPassword = document.querySelector(".reset-password");
var preSlide = document.getElementById("preSlide");
var nextSlide = document.getElementById("nextSlide");
var currentSlide = document.getElementById("current-slide");
var album = ["pic-01.png", "pic-02.png", "pic-03.png"];
var fromDataChangeInfo = document.querySelector(".c-change-info");
var updateDataProfile = document.querySelector(".c-change-info");
var fromLoginAgain = document.querySelector(".c-login-again");
// Customer Login or Sign up

function checkSpace(str) {
   return str.indexOf(" ") >= 0;
}

function checkCharSpecial(str) {
   return str.indexOf("'") >= 0 || str.indexOf('"') >= 0;
}

function isNum(str) {
   for (let index = 0; index < str.length; index++)
      if (!Number.isInteger(parseInt(str[index]))) return false;

   return true;
}

function encryptedAES_hash_AES(password, key_username) {
   var encryptedAES = CryptoJS.AES.encrypt(password, key_username);
   console.log("ma hoa : ", encryptedAES.toString());

   return encryptedAES.toString();
}

function decryptedBytes_hash_AES(block, key_username) {
   var decryptedBytes = CryptoJS.AES.decrypt(block, key_username);
   var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);

   return plaintext;
}

function loginCustomer() {
   formDataLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      // Check data input of login

      if (checkSpace(formDataLogin["login-username"].value))
         document.getElementById("login-warning-username").style.opacity = "1";
      else
         document.getElementById("login-warning-username").style.opacity = "0";
      if (checkSpace(formDataLogin["login-password"].value))
         document.getElementById("login-warning-password").style.opacity = "1";
      else
         document.getElementById("login-warning-password").style.opacity = "0";

      // let password = encryptedAES_hash_AES( formDataLogin['login-password'].value, formDataLogin['login-username'].value); //hash_coding password

      // Login user[Member]
      firebase
         .firestore()
         .collection("member")
         .doc(formDataLogin["login-username"].value)
         .get()
         .then((doc) => {
            if (doc.exists) {
               firebase
                  .auth()
                  .signInWithEmailAndPassword(
                     doc.data().email,
                     formDataLogin["login-password"].value
                  )
                  .then(() => {
                     // notify.play();
                     load_login();
                     notification("Đăng nhập thành công ", true);
                     document.querySelector(".layer-blur").style.display =
                        "none";
                     username = doc.data().username;
                     push_data_from_list_incart(username);
                  })
                  .catch((error) => {
                     document.getElementById(
                        "login-warning-password"
                     ).style.opacity = "1";
                  });
            } else {
               document.getElementById("login-warning-password").style.opacity =
                  "1";
               // notification("Tài khoản mật khẩu không đúng",false);
            }
         })
         .catch((error) => {
            notification(error, false);
            document.getElementById("login-warning-password").style.opacity =
               "1";
         });
   });
}

function signUpCustomer() {
   formDataSignUp.addEventListener("submit", (e) => {
      e.preventDefault();

      // Check data input of sign up
      if (formDataSignUp["signup-fullname"].value == "")
         document.getElementById("signup-warning-fullname").style.opacity = "1";
      else
         document.getElementById("signup-warning-fullname").style.opacity = "0";

      if (formDataSignUp["signup-birthdate"].value == "")
         document.getElementById("signup-warning-birthdate").style.opacity =
            "1";
      else
         document.getElementById("signup-warning-birthdate").style.opacity =
            "0";

      if (formDataSignUp["gender"].value == "")
         document.getElementById("signup-warning-gender").style.opacity = "1";
      else document.getElementById("signup-warning-gender").style.opacity = "0";

      if (formDataSignUp["signup-tel"].value == "")
         document.getElementById("signup-warning-tel").style.opacity = "1";
      else {
         if (!isNum(formDataSignUp["signup-tel"].value)) {
            document.getElementById("signup-warning-tel").style.opacity = "1";
         } else {
            document.getElementById("signup-warning-tel").style.opacity = "0";
         }
      }

      if (checkSpace(formDataSignUp["signup-username"].value))
         document.getElementById("signup-warning-username").style.opacity = "1";
      else
         document.getElementById("signup-warning-username").style.opacity = "0";

      if (checkSpace(formDataSignUp["signup-email"].value))
         document.getElementById("signup-warning-email").style.opacity = "1";
      else document.getElementById("signup-warning-email").style.opacity = "0";

      if (checkSpace(formDataSignUp["signup-password"].value))
         document.getElementById("signup-warning-password").style.opacity = "1";
      else
         document.getElementById("signup-warning-password").style.opacity = "0";

      if (
         formDataSignUp["signup-repassword"].value !=
         formDataSignUp["signup-password"].value
      )
         document.getElementById("signup-warning-repassword").style.opacity =
            "1";
      else
         document.getElementById("signup-warning-repassword").style.opacity =
            "0";

      if (formDataSignUp["signup-address"].value == "")
         document.getElementById("signup-warning-address").style.opacity = "1";
      else
         document.getElementById("signup-warning-address").style.opacity = "0";

      // Create account user[Member]

      if (
         formDataSignUp["signup-fullname"].value != "" &&
         formDataSignUp["signup-birthdate"].value != "" &&
         formDataSignUp["gender"].value != "" &&
         formDataSignUp["signup-tel"].value != "" &&
         isNum(formDataSignUp["signup-tel"].value) &&
         !checkSpace(formDataSignUp["signup-username"].value) &&
         !checkSpace(formDataSignUp["signup-email"].value) &&
         !checkSpace(formDataSignUp["signup-password"].value) &&
         formDataSignUp["signup-repassword"].value ==
            formDataSignUp["signup-password"].value &&
         formDataSignUp["signup-address"].value != ""
      ) {
         db.collection("member")
            .doc(formDataSignUp["signup-username"].value)
            .get()
            .then((doc) => {
               if (doc.exists) {
                  document.getElementById(
                     "signup-warning-username"
                  ).style.opacity = "1";
                  return;
               } else {
                  // let password = encryptedAES_hash_AES(formDataSignUp['signup-password'].value.trim(),formDataSignUp['signup-username'].value);
                  firebase
                     .auth()
                     .createUserWithEmailAndPassword(
                        formDataSignUp["signup-email"].value.trim(),
                        formDataSignUp["signup-password"].value.trim()
                     ) // formDataSignUp['signup-password'].value.trim()
                     .then(() => {
                        firebase.auth().currentUser.updateProfile({
                           displayName:
                              formDataSignUp["signup-username"].value.trim(),
                        });
                        firebase
                           .firestore()
                           .collection("member")
                           .doc(formDataSignUp["signup-username"].value)
                           .set({
                              fullname: formDataSignUp["signup-fullname"].value,
                              birthdate: firebase.firestore.Timestamp.fromDate(
                                 new Date(
                                    formDataSignUp["signup-birthdate"].value
                                 )
                              ),
                              gender: formDataSignUp["gender"].value,
                              tel: formDataSignUp["signup-tel"].value,
                              username: formDataSignUp["signup-username"].value,
                              email: formDataSignUp["signup-email"].value,
                              address: formDataSignUp["signup-address"].value,
                              list_product: [],
                           })
                           .then(() => {
                              notify.play();
                              notification(
                                 "Đăng ký tài khoản thành công!",
                                 true
                              );
                              auth.signOut();
                              document.getElementsByClassName(
                                 "c-user-1"
                              )[0].innerHTML = "";

                              document.getElementById(
                                 "nameCurrentUser"
                              ).innerHTML = "Tài khoản";

                              gotoLogin.style.backgroundColor =
                                 "rgb(255, 99, 71)";
                              gotoSignUp.style.backgroundColor =
                                 "rgb(255, 255, 255)";
                              gotoLogin.style.boxShadow = "none";
                              gotoSignUp.style.boxShadow =
                                 "inset 20px 20px 60px rgb(190, 190, 190), inset -20px -20px 60px rgb(255, 255, 255)";

                              formDataLogin.style.display = "flex";
                              formDataSignUp.style.display = "none";
                           })
                           .catch((error) => {
                              console.log(error.message);
                           });
                     })
                     .catch((error) => {
                        document.getElementById(
                           "signup-warning-email"
                        ).style.opacity = "1";
                        // notification(error.message,false);
                     });
               }
            });
      }
   });
}

function update_info_member() {
   // notification("update day",true);
   fromDataChangeInfo.addEventListener("submit", (e) => {
      e.preventDefault();

      // Check data input of sign up
      if (fromDataChangeInfo["change-fullname"].value == "")
         document.getElementById("change-warning-fullname").style.opacity = "1";
      else
         document.getElementById("change-warning-fullname").style.opacity = "0";

      if (fromDataChangeInfo["change-birthdate"].value == "")
         document.getElementById("change-warning-birthdate").style.opacity =
            "1";
      else
         document.getElementById("change-warning-birthdate").style.opacity =
            "0";

      if (fromDataChangeInfo["gender"].value == "")
         document.getElementById("change-warning-gender").style.opacity = "1";
      else document.getElementById("change-warning-gender").style.opacity = "0";

      if (fromDataChangeInfo["change-tel"].value == "")
         document.getElementById("signup-warning-tel").style.opacity = "1";
      else {
         if (!isNum(fromDataChangeInfo["change-tel"].value)) {
            document.getElementById("change-warning-tel").style.opacity = "1";
         } else {
            document.getElementById("change-warning-tel").style.opacity = "0";
         }
      }

      if (checkSpace(fromDataChangeInfo["change-username"].value))
         document.getElementById("change-warning-username").style.opacity = "1";
      else
         document.getElementById("change-warning-username").style.opacity = "0";

      if (checkSpace(fromDataChangeInfo["change-email"].value))
         document.getElementById("change-warning-email").style.opacity = "1";
      else document.getElementById("change-warning-email").style.opacity = "0";

      if (checkSpace(fromDataChangeInfo["change-password"].value))
         document.getElementById("change-warning-password").style.opacity = "1";
      else
         document.getElementById("change-warning-password").style.opacity = "0";

      if (
         fromDataChangeInfo["change-repassword"].value !=
         fromDataChangeInfo["change-password"].value
      )
         document.getElementById("change-warning-repassword").style.opacity =
            "1";
      else
         document.getElementById("change-warning-repassword").style.opacity =
            "0";

      if (fromDataChangeInfo["change-address"].value == "")
         document.getElementById("change-warning-address").style.opacity = "1";
      else
         document.getElementById("change-warning-address").style.opacity = "0";

      if (
         fromDataChangeInfo["change-fullname"].value != "" &&
         fromDataChangeInfo["change-birthdate"].value != "" &&
         fromDataChangeInfo["gender"].value != "" &&
         fromDataChangeInfo["change-tel"].value != "" &&
         isNum(fromDataChangeInfo["change-tel"].value) &&
         !checkSpace(fromDataChangeInfo["change-username"].value) &&
         !checkSpace(fromDataChangeInfo["change-email"].value) &&
         !checkSpace(fromDataChangeInfo["change-password"].value) &&
         fromDataChangeInfo["change-address"].value != ""
      ) {
         let flag = true;
         // update profile
         db.collection("member")
            .doc(auth.currentUser.displayName)
            .update({
               fullname: updateDataProfile["change-fullname"].value,
               gender: updateDataProfile["gender"].value,
               birthdate: firebase.firestore.Timestamp.fromDate(
                  new Date(updateDataProfile["change-birthdate"].value)
               ),
               tel: updateDataProfile["change-tel"].value,
               address: updateDataProfile["change-address"].value,
            })
            .then(() => {
               flag = true;
               notification("Cập nhật thành công !!!", true);
            })
            .catch((e) => {
               console.log(e);
            });
      }

      if (fromDataChangeInfo["change-password"].value != "") {
         if (
            fromDataChangeInfo["change-repassword"].value ==
            fromDataChangeInfo["change-password"].value
         ) {
            document.querySelector(".login-again").style.display = "block";
            document.getElementById("login-username-again").value = "";
            document.getElementById("login-password-again").value = "";
         }
      }
      close_update_profile();
   });
}

function close_Login_Again() {
   document.querySelector(".login-again").style.display = "none";
}

function login_Again() {
   fromLoginAgain.addEventListener("submit", (e) => {
      e.preventDefault();
      // Check data input of login
      if (checkSpace(fromLoginAgain["login-username-again"].value))
         document.getElementById("login-warning-username-again").style.opacity =
            "1";
      else
         document.getElementById("login-warning-username-again").style.opacity =
            "0";
      if (checkSpace(fromLoginAgain["login-password-again"].value))
         document.getElementById("login-warning-password-again").style.opacity =
            "1";
      else
         document.getElementById("login-warning-password-again").style.opacity =
            "0";

      // credential user[Member]
      let password = fromLoginAgain["login-password-again"].value;
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
         auth.currentUser.email,
         password
      );
      user.reauthenticateWithCredential(credential);
      auth.currentUser
         .reauthenticateWithCredential(credential)
         .then(function () {
            auth.currentUser
               .updatePassword(fromDataChangeInfo["change-password"].value)
               .then(function () {
                  notification("Thay đổi mật khẩu thành công ", true);
                  close_Login_Again();
               })
               .catch(function (e) {
                  // notification(e.message,false);
                  document.getElementById(
                     "login-warning-password-again"
                  ).style.opacity = "1";
               });
         })
         .catch((error) => {
            // notification(error,false);
            document.getElementById(
               "login-warning-password-again"
            ).style.opacity = "1";
         });
   });
}
// Main Customer

var interval_obj = setInterval(() => {
   if (firebase.auth().currentUser != null) {
      document.getElementById("nameCurrentUser").innerHTML =
         firebase.auth().currentUser.displayName;
      document.getElementsByClassName(
         "c-user-1"
      )[0].innerHTML += `<div class="c-currentUser">
            <img id="currentUserImg" src="" alt="user.png" srcset="./image/user.png" />
            <span id="update-profile" onclick = "update_profile()">Sửa hồ sơ</span>
            <span id="logout-profile" onclick = "logout()">Đăng xuất</span>        
        </div>`;
      clearInterval(interval_obj);
   } else {
      document.getElementsByClassName("c-user-1")[0].innerHTML = "";
      document.getElementById("nameCurrentUser").innerHTML = "Tài khoản";
   }
}, 0);

function load_login() {
   if (firebase.auth().currentUser != null) {
      document.getElementById("nameCurrentUser").innerHTML =
         firebase.auth().currentUser.displayName;
      document.getElementsByClassName(
         "c-user-1"
      )[0].innerHTML += `<div class="c-currentUser">
                <img id="currentUserImg" src="" alt="user.png" srcset="./image/user.png" />
                <span id="update-profile" onclick = "update_profile()">Sửa hồ sơ</span>
                <span id="logout-profile" onclick = "logout()">Đăng xuất</span>        
            </div>`;
      return true;
   } else {
      document.getElementsByClassName("c-user-1")[0].innerHTML = "";
      document.getElementById("nameCurrentUser").innerHTML = "Tài khoản";
      return false;
   }
}

function logout() {
   console.log(firebase.auth().signOut());
   notification("Đã đăng xuất", true);
   document.getElementsByClassName("c-user-1")[0].innerHTML = "";
   document.getElementById("nameCurrentUser").innerHTML = "Tài khoản";
   document.getElementById("number-sp").innerHTML = "0";
}

function close_update_profile() {
   document.getElementsByClassName("change-info-member")[0].style.display =
      "none";
}

function update_profile() {
   db.collection("member")
      .doc(auth.currentUser.displayName)
      .get()
      .then((doc) => {
         if (doc.exists) {
            let user_profile = doc.data();
            updateDataProfile["change-fullname"].value = user_profile.fullname;
            updateDataProfile["change-username"].value = user_profile.username;

            let temp_date = new Date(user_profile.birthdate.seconds * 1000);
            let temp_string =
               temp_date.getFullYear() +
               "-" +
               ("0" + (temp_date.getMonth() + 1)).substr(-2) +
               "-" +
               ("0" + temp_date.getDate()).substr(-2);
            console.log(temp_string);

            updateDataProfile["change-birthdate"].value = temp_string;
            updateDataProfile["change-email"].value = user_profile.email;
            updateDataProfile["gender"].value = user_profile.gender;
            updateDataProfile["change-tel"].value = user_profile.tel;
            updateDataProfile["change-address"].value = user_profile.address;
         }
      });
   document.getElementsByClassName("change-info-member")[0].style.display =
      "block";
   document.getElementById("change-password").value = "";
   document.getElementById("change-repassword").value = "";
}

function reset_password() {
   //change from email to username
   document.getElementById("checked-username").style.display = "none";
   document.querySelector(".reset-pass").addEventListener("submit", (e) => {
      e.preventDefault();
      let username = document.getElementById("email-reset").value;
      db.collection("member")
         .doc(username)
         .get()
         .then((user) => {
            if (user.exists) {
               firebase.auth().languageCode = "vn";
               auth
                  .sendPasswordResetEmail(user.data().email)
                  .then(function () {
                     alert(
                        "Kiểm tra tài khoản Email " +
                           user.data().email +
                           " để reset lại mật khẩu !!!"
                     );
                  })
                  .catch((error) => {
                     console.log(error.message);
                  });
            } else {
               document.getElementById("checked-username").style.display =
                  "block";
               return;
            }
         })
         .catch((error) => {
            console.log(error);
            document.getElementById("checked-username").style.display = "block";
         });
   });
}

function close_reset_password() {
   document.getElementsByClassName("reset-pass")[0].style.display = "none";
}

function open_reset_password() {
   document.getElementsByClassName("reset-pass")[0].style.display = "flex";
}
// Event

document.querySelector(".scroll-top").addEventListener("click", () => {
   document.querySelector(".c-slideshow").scrollIntoView(0);
});

document.querySelector(".layer-blur").addEventListener("contextmenu", () => {
   document.querySelector(".layer-blur").style.display = "none";
});

document.querySelector(".layer-blur").addEventListener("contextmenu", () => {
   document.querySelector(".layer-blur").style.display = "none";
});

searchProduct.addEventListener("submit", (e) => {
   e.preventDefault();

   console.log("Key Search = " + searchProduct["key-product"].value);
});

user.addEventListener("click", () => {
   if (firebase.auth().currentUser == null) {
      document.querySelector(".layer-blur").style.display = "flex";
      loginCustomer();
      signUpCustomer();
   }
});
if (auth.currentUser != null)
   document.getElementById("update-profile").addEventListener("click", () => {
      console.log("Go to Edit Profile!");
   });

if (auth.currentUser != null)
   document.getElementById("logout-profile").addEventListener("click", () => {
      console.log("Go to Logout Profile!");
   });

cart.addEventListener("click", () => {
   console.log("Go to Gio Hang!");
});

formDataSignUp.style.display = "none";

gotoLogin.addEventListener("click", () => {
   gotoLogin.style.backgroundColor = "rgb(255, 99, 71)";
   gotoSignUp.style.backgroundColor = "rgb(255, 255, 255)";
   gotoLogin.style.boxShadow = "none";
   gotoSignUp.style.boxShadow =
      "inset 20px 20px 60px rgb(190, 190, 190), inset -20px -20px 60px rgb(255, 255, 255)";

   formDataLogin.style.display = "flex";
   formDataSignUp.style.display = "none";
});

gotoSignUp.addEventListener("click", () => {
   gotoSignUp.style.backgroundColor = "rgb(255, 99, 71)";
   gotoLogin.style.backgroundColor = "rgb(255, 255, 255)";
   gotoSignUp.style.boxShadow = "none";
   gotoLogin.style.boxShadow =
      "inset 20px 20px 60px rgb(190, 190, 190), inset -20px -20px 60px rgb(255, 255, 255)";

   formDataLogin.style.display = "none";
   formDataSignUp.style.display = "grid";
});

signUpTooglePass.addEventListener("click", () => {
   if (signUpTooglePass.className == "fi-rr-eye") {
      formDataSignUp["signup-password"].type = "password";
      signUpTooglePass.className = "fi-rr-eye-crossed";
   } else {
      formDataSignUp["signup-password"].type = "text";
      signUpTooglePass.className = "fi-rr-eye";
   }
});

signUpToogleRepass.addEventListener("click", () => {
   if (signUpToogleRepass.className == "fi-rr-eye") {
      formDataSignUp["signup-repassword"].type = "password";
      signUpToogleRepass.className = "fi-rr-eye-crossed";
   } else {
      formDataSignUp["signup-repassword"].type = "text";
      signUpToogleRepass.className = "fi-rr-eye";
   }
});

loginTooglePass.addEventListener("click", () => {
   if (loginTooglePass.className == "fi-rr-eye") {
      formDataLogin["login-password"].type = "password";
      loginTooglePass.className = "fi-rr-eye-crossed";
   } else {
      formDataLogin["login-password"].type = "text";
      loginTooglePass.className = "fi-rr-eye";
   }
});

loginTooglePassAgain.addEventListener("click", () => {
   if (loginTooglePassAgain.className == "fi-rr-eye") {
      formDataLoginAgain["login-password-again"].type = "password";
      loginTooglePassAgain.className = "fi-rr-eye-crossed";
   } else {
      formDataLoginAgain["login-password-again"].type = "text";
      loginTooglePassAgain.className = "fi-rr-eye";
   }
});

updateToogleRepass.addEventListener("click", () => {
   if (updateToogleRepass.className == "fi-rr-eye") {
      fromDataChangeInfo["change-repassword"].type = "password";
      updateToogleRepass.className = "fi-rr-eye-crossed";
   } else {
      fromDataChangeInfo["change-repassword"].type = "text";
      updateToogleRepass.className = "fi-rr-eye";
   }
});

updateTooglePass.addEventListener("click", () => {
   if (updateTooglePass.className == "fi-rr-eye") {
      fromDataChangeInfo["change-password"].type = "password";
      updateTooglePass.className = "fi-rr-eye-crossed";
   } else {
      fromDataChangeInfo["change-password"].type = "text";
      updateTooglePass.className = "fi-rr-eye";
   }
});

//render

document.getElementsByClassName("plus")[0].addEventListener("mouseover", () => {
   document.getElementsByClassName("drop-down-icon-a")[0].style.display =
      "block";
});

document.getElementsByClassName("plus")[0].addEventListener("mouseout", () => {
   document.getElementsByClassName("drop-down-icon-a")[0].style.display =
      "none";
});
