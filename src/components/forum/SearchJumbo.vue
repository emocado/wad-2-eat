<template>
    <div id="app" class="jumbotron align-center mx-4 pt-2 p-4  mb-4">
        <div class="row mx-5-sm mt-5 ">
            <div class="search-bar input-group">
                <input @keyup="filterPost" type="text" class="input-search form-control"
                    placeholder="Search for areas, food type" aria-label="Recipient's username"
                    aria-describedby="button-addon2" v-model="search">
                <button @click="filterPost" class="btn btn-outline-secondary search" type="button"
                    id="button-addon2"><img id="search-icon" src="../../assets/findFood.png"></button>
            </div>
            <div class="col-2">

            </div>
        </div>
        <div class="row mx-5-sm mt-3 position-relative">
            <button @click="createPost" class="sort btn btn-primary btn-sm position-absolute end-0" id="add_post"
                data-bs-toggle="collapse" href="#collapseExample" role="button" v-bind:aria-expanded="form_expand"
                aria-controls="collapseExample">{{ openClose }}</button>
            <div class="collapse mt-4" id="collapseExample" style="border-radius:20px">
                <div class="card card-body mt-4 w-100 ">
                    <div>
                        <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input v-model="title" type="text" class="form-control" id="title" aria-describedby="title">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea v-model="description" class="form-control" id="description" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">Image</label>
                            <input @change="fileUpload" type="file" class="form-control" id="image">
                        </div>
                        <button @click="submit_post" role="button" id="submit_btn" style="background: rgb(234, 156, 169);" class=" btn text-white">Submit Post ! </button>
                    </div>
                    <div v-if="success" class="alert alert-success" role="alert">
                        Added Post Successfully ! 
                    </div>
                    <div v-if="error" class="alert alert-danger" role="alert">
                        {{error_message}}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
// import { async } from '@firebase/util';
// import data from '../data';
import {
    ref as FBref,
    getStorage,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { useAuth } from "../../firebase";
import { getAuth } from 'firebase/auth'

export default {
    emits: ['fetch_data'],
    data() {
        return {
            addForm: false,
            title: "",
            description: "",
            image: "",
            downloadUrl: "",
            // success_msg: false,
            form_expand: false,
            search: "",
            hide_error: true,
            success:false,
            error:false,
            error_message:"",
        }
    },
    methods: {
        filterPost() {
            console.log(this.search);
            console.log("YOUR MOTHER ");
            this.$emit('fetch_data', this.search)
        },
        createPost() {
            if (this.addForm == false) {
                this.addForm = true;
            } else {
                this.addForm = false;
            }
        },
        submit_post() {
            const auth = getAuth();
            const user = auth.currentUser;
            console.log(user.metadata);

            if (user == null) {
                this.error = true;
                this.error_message = "Failed to add post , You are not logged in ! "
                return;
            }
            if(this.title == "" || this.description == "" || this.image == ""){
                this.error = true;
                this.error_message = "Please fill all the fields";
                return;
            }

            const displayName = user.displayName;
            const db = getFirestore();
            var obj = {
                title: this.title,
                description: this.description,
                image: this.downloadUrl,
                host: displayName,
                date_added: new Date().toLocaleString()
            };
            const colRef = collection(db, "forum_post");
            addDoc(colRef, obj).then((response) => {
                console.log(response);
                console.log("Upload completed ")
                this.createPost();
                this.form_expand = false;
                document.getElementById('collapseExample').setAttribute("class", "collapse");
                this.title = ""
                this.description = ""
                this.downloadUrl = "";
                this.image = "";
                this.success = true;
            });
        },
        fileUpload() {
            var file = event.target.files[0]
            const metadata = {
                contentType: "image/jpeg",
            };
            const storage = getStorage();
            console.log(storage);
            console.log("storage");
            const storageRef = FBref(storage, "images/" + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            console.log("uploading image");
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case "storage/unauthorized":
                            // User doesn't have permission to access the object
                            break;
                        case "storage/canceled":
                            // User canceled the upload
                            break;

                        // ...

                        case "storage/unknown":
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        this.downloadUrl = downloadURL;
                    });
                }
            );
        }
    },
    computed: {
        openClose() {
            if (this.addForm) {
                return "Close";
            } else {
                return "Add Post";
            }
        }
    },
}
</script>

<style scoped>
#search-icon {
    height: 100%;
}

.sort {
    margin-left: 10px;
    margin-right: 10px;
    width: 100px;
}

.input-search:focus {
    box-shadow: 0 10px 20px rgba(245, 164, 164, 0.6);
    border-color: rgb(234, 156, 169);
}

.search {
    height: 50px;
    border: none;
    background: rgb(234, 156, 169);
}
/* #submit_btn:active:hover{
    background: rgb(234, 156, 169);

} */

.jumbotron {
    /* background-color: rgb(243, 201, 125); */
    /* background-color: rgb(186, 167, 167); */
    border-radius: 20px;
}

#add_post{
    border: none;
    background: rgb(234, 156, 169);
}

input::placeholder {
    font-style: italic;
    opacity: .5;
    color: rgb(234, 156, 169);
}
</style>