<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="container-fluid" v-if="allPost.length != 0">
        <div class="row">
            <div class="col pt-5 text-center">
                <h3 class="font-weight-bold">{{ allPost[0].title }}</h3>
            </div>
            <!-- {{allPost}} -->
        </div>
        <div class="row">
            <div class="col d-flex justify-content-center"><img class="w-75" :src="allPost[0].image"></div>
        </div>
        <div class="row mt-5 p-2">
            <h2>Caption</h2>
            <div style="border:2px solid mistyrose; border-radius:15px ; padding:20px">
                
                <p>
                    {{ allPost[0].description }}
                </p>
            </div>
        </div>
        <div class="row">
            <h5> Comments</h5>
            <div class="col" v-if="allComments.length != 0">
                <!-- <div v-for="comment of allComments" class="row">
                    <p class="fs-4">{{ comment.author }}</p>
                    <p class=" p-4 border" style="border-radius:10px">
                        {{ comment.comment_text }}
                    </p>
                </div> -->
                <ul class="list-group">
                    <li v-for="comment of allComments" class="list-group-item">
                    <p class="fs-4" style="font-style:italic; text-decoration:underline">{{ comment.author }}</p>
                    <p class=" p-4 border" style="border-radius:10px">
                        {{ comment.comment_text }}
                    </p></li>
                </ul>
            </div>
            <div class='mb-3 mt-3'>
                <label for='newCommentText' class='form-label'>Enter Your Comments here</label>
                <textarea class='form-control' id='newCommentText' rows='3' v-model="comment_box"></textarea>
                <button class="btn" @click="add_comment">Add comment!</button>
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
const db = getFirestore();
export default {
    data() {
        return {
            postid: this.$route.params.postid,
            allPost: [],
            dataReady: false,
            allComments: [],
            comment_box: "",
        }
    },
    methods: {
        getId() {
            console.log(this.postid);
        },
        async getPost() {
            const post = query(
                collection(db, 'forum_post'),
                where('__name__', "==", this.postid));
            const querySnapshot = await getDocs(post)
            // console.log(doc(collection(db,'forum_post'),('S92YkYgAiBkwkQj5dw12')).data())
            querySnapshot.forEach((doc) => {
                this.allPost.push(doc.data());
            });
            console.log(this.allPost);
        },
        async getComments() {
            const comments = query(
                collection(db, 'post_comment'),
                where('postid', '==', this.postid));
            const querySnapshot = await getDocs(comments)

            querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                this.allComments.push(doc.data());
            });
            console.log(this.allComments);
        },
        add_comment() {
            const db = getFirestore();
            var obj = {
                author: "MistakeAura", //try to find if can get the currently auth guy's name 
                comment_text: this.comment_box,
                postid: this.postid,
            };
            const colRef = collection(db, "post_comment");
            addDoc(colRef, obj).then((response) => {
                console.log(response);
                console.log("Upload completed ")
                this.comment_box = ""
                this.allComments= [];
                this.getComments();
            });

        }
    },
    created() {
        this.getPost();
        this.getComments();
    },

}

</script>