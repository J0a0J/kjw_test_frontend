<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h2>게시글 상세 정보</h2>
        <p><strong>제목:</strong> {{ board.title }}</p>
        <p><strong>작성자:</strong> {{ board.writer }}</p>
        <p><strong></strong> {{ board.content }}</p>
        <hr />
        <div class="card mb-4">
          <div class="card-body">
            <form @submit.prevent="postComment">
              <div class="mb-3">
                <label for="commentName" class="form-label">작성자</label>
                <input
                  type="text"
                  class="form-control"
                  id="commentName"
                  v-model="comment.writer"
                  placeholder="이름"
                />
              </div>
              <div class="mb-3">
                <label for="commentContent" class="form-label">댓글</label>
                <textarea
                  class="form-control"
                  id="commentContent"
                  rows="3"
                  v-model="comment.content"
                  placeholder="댓글 내용"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                Post Comment
              </button>
            </form>
          </div>
        </div>

        <!-- Comments List -->
        <div class="comments-list">
          <div
            v-for="comment in board.commentList"
            :key="comment.idx"
            class="card mb-3"
          >
            <div class="card-body">
              <div class="d-flex mb-3">
                <div>
                  <h5 class="card-title mb-0">{{ comment.writer }}</h5>
                </div>
              </div>
              <p class="card-text">{{ comment.content }}</p>
              <div class="d-flex justify-content-end"></div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" @click="$router.push('/')">
          목록으로
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/api";

export default {
  name: "BoardDetail",
  props: ["idx"],
  mounted() {
    this.getBoardDetail(this.idx);
  },
  data() {
    return {
      board: {},
      comment: {
        writer: "",
        content: "",
        board: {},
      },
    };
  },
  methods: {
    async getBoardDetail(idx) {
      try {
        console.log("id value before API call:", idx);
        const response = await apiClient.get(`/board/list/${idx}`);
        this.board = response.data;
        this.comment.board = this.board;
      } catch (error) {
        console.log("error is " + error);
      }
    },
    async postComment() {
      try {
        await apiClient.post(
          "/comment/register",
          this.comment
        );
        window.location.reload();
      } catch (error) {
        console.log("error is " + error);
      }
    },
  },
};
</script>

<style scoped>
body {
  background: #f3f3f3;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  color: #616f80;
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: flex-start; /* 페이지 상단에서 시작 */
  min-height: 100vh; /* 화면 높이를 꽉 채움 */
}

.container {
  margin-top: 20px;
  width: 80%;
}

button,
button:hover {
  background-color: #42b983;
  border: #42b983;
}
</style>
