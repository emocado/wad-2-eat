<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="container-fluid mx-2" v-if="allPost.length != 0">
        <div class="row">
            <div class="col pt-5 text-center">
                <h3 class="font-weight-bold"> {{ allPost[0].title }}</h3>
            </div>
            <!-- {{allPost}} -->
        </div>
        <div class="row mb-3 mt-3">
            <div class="col d-flex justify-content-center mb-3"><img class="w-75" :src="allPost[0].image"></div>
            <div class="text-center text-muted text-wrap text-break">{{ allPost[0].description }}</div>
        </div>
        <div class="row">
            <h5> Comments</h5>
            <div class="col mb-3" v-if="allComments.length != 0"
                style="border:2px solid grey ; padding: 10px; box-shadow: 5px 10px #888997;border-radius: 15px;">
                <div class=" p-4 my-3" v-for="comment of allComments"
                    style="border:3px solid ;border-radius:15px;border-color: aliceblue;">
                    <p class="fs-6 " style="font-style:italic; text-decoration:underline;">{{ comment.author }}</p>
                    <p class="px-3">
                        {{ comment.comment_text }}
                    </p>
                </div>

            </div>
            <div class='mb-3 mt-3'>
                <label for='newCommentText' class='form-label'>Enter Your Comments here</label>
                <textarea class='form-control mb-3' id='newCommentText' rows='3' v-model="comment_box"></textarea>
                <button class="btn mb-3 border-0" id="add_comment_btn" @click="add_comment"
                    style="color :white;background:rgb(234, 156, 169)">Add comment!</button>
                <p v-if="error" class="alert alert-danger">
                    {{ error_message }}
                </p>
            </div>
        </div>
    </div>

</template>

<script>
import {
    // doc,
    getFirestore,
    collection,
    getDocs,
    query,
    addDoc,
    where,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const db = getFirestore();
export default {
    props: ['allPost'],
    data() {
        return {
            // allPost: [],
            dataReady: false,
            allComments: [],
            comment_box: "",
            error: false,
            error_message: "",
        };
    },
    watch: {
        allPost: {
            handler: function () {
                this.getComments()
            },
            deep: true,
        },
    },
    methods: {
        // async getPost() {
        //     const post = query(collection(db, "forum_post"), where("__name__", "==", this.postid));
        //     const querySnapshot = await getDocs(post);
        //     // console.log(doc(collection(db,'forum_post'),('S92YkYgAiBkwkQj5dw12')).data())
        //     querySnapshot.forEach((doc) => {
        //         this.allPost.push(doc.data());
        //     });
        //     console.log(this.allPost);
        // },
        async getComments() {
            this.allComments = [];
            const comments = query(collection(db, "post_comment"), where("postid", "==", this.postid));
            const querySnapshot = await getDocs(comments);
            querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                this.allComments.push(doc.data());
            });
        },
        add_comment() {
            const db = getFirestore();
            const auth = getAuth();
            const user = auth.currentUser;
            if (user == null) {
                this.error = true;
                this.error_message = "Please login to comment";
                return;
            }
            if (this.comment_box == "") {
                this.error = true;
                this.error_message = "Please enter a comment";
                return;
            }
            const displayName = user.displayName;
            var obj = {
                author: displayName,
                comment_text: this.comment_box,
                postid: this.postid,
            };
            const colRef = collection(db, "post_comment");
            addDoc(colRef, obj).then((response) => {
                console.log(response)
                this.comment_box = "";
                this.allComments = [];
                this.getComments();
            });
            this.error = false;
            this.error_message = "";
        }
    },
    created() {
        // this.getPost();
        this.getComments();
    },
    computed: {
        postid() {
            return this.$route.params.postid
        },
    }
}

</script>
<style scoped>
#newCommentText:focus {
    box-shadow: 0 10px 20px rgba(245, 164, 164, 0.6);
    border-color: rgb(234, 156, 169);
}

;

#add_comment_btn {
    height: 50px;
    border: none;
    background-color: rgb(234, 156, 169);
    /* color: white; */
    /* border-radius: 10px;
    border: none;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer; */
}
</style>