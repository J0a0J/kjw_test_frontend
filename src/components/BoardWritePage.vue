<template>
  <div class="container">
    <h1>게시글 작성</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">제목</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="board.title"
          required
        />
      </div>
      <div class="form-group">
        <label for="writer">작성자</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="board.writer"
          required
        />
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea
          class="form-control"
          id="content"
          v-model="board.content"
          rows="4"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">작성 완료</button>
    </form>
  </div>
</template>

<script>
import apiClient from "@/api";

export default {
  data() {
    return {
      board: {
        title: "",
        writer: "",
        content: "",
      },
    };
  },
  methods: {
    async submitForm() {
      await apiClient.post("/board/register", this.board);
      this.$router.push("/"); // 글 작성 후 게시판 목록으로 돌아가도록
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  width: 50%;
}

.form-group {
  margin-bottom: 15px;
}

button ,
button:hover
{
  background-color: #42b983;
  border: #42b983;
}
</style>
