<template>
  <link
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
    rel="stylesheet"
  />

  <div class="container">
    <div class="header">
      <h1>게시판</h1>
      <button class="btn btn-primary custom-btn" @click="goToWritePage">
        게시글 작성
      </button>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive project-list">
              <table class="table project-table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">게시번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성자</th>
                    <th scope="col">댓글</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="board in pagedBoards"
                    :key="board.idx"
                    @click="goToDetail(board.idx)"
                  >
                    <th scope="row">{{ board.idx }}</th>
                    <td>{{ board.title }}</td>
                    <td>{{ board.writer }}</td>
                    <td>
                      <span class="text-success font-12">
                        <i class="mdi mdi-checkbox-blank-circle mr-1"></i>
                        {{ board.commentCount }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="pt-3">
              <ul class="pagination justify-content-end mb-0">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(currentPage - 1)"
                  >
                    Previous
                  </a>
                </li>
                <li
                  class="page-item"
                  :class="{ active: currentPage === pageNumber }"
                  v-for="pageNumber in totalPages"
                  :key="pageNumber"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(pageNumber)"
                  >
                    {{ pageNumber }}
                  </a>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: currentPage === totalPages }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(currentPage + 1)"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/api";

export default {
  name: "BoardList",
  props: {
    msg: String,
  },
  mounted() {
    this.getBoards();
  },
  data() {
    return {
      boards: [], // 전체 게시글
      currentPage: 1, // 현재 페이지
      pageSize: 5, // 한 페이지에 보여줄 게시글 수
    };
  },
  computed: {
    // 페이지네이션 처리된 게시글 목록
    pagedBoards() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.boards.slice(startIndex, startIndex + this.pageSize);
    },
    // 전체 페이지 수 계산
    totalPages() {
      return Math.ceil(this.boards.length / this.pageSize);
    },
  },
  methods: {
    async getBoards() {
      try {
        const response = await apiClient.get("/board/list"); // Base URL 자동 적용
      this.boards = response.data;
      } catch (error) {
        console.log("Error fetching boards:", error);
      }
    },
    goToDetail(boardIdx) {
      this.$router.push(`/list/${boardIdx}`);
    },
    changePage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.totalPages) return;
      this.currentPage = pageNumber;
    },
    goToWritePage() {
      this.$router.push(`/write`);
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
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.container {
  margin-top: 20px;
  width: 80%;
}

th {
  cursor: pointer; /* 컬럼 헤더를 클릭할 수 있도록 */
  background-color: #f8f9fa;
}

table tr:hover td,
table tr:hover th {
  background-color: #e2e6ea;
}

button.custom-btn {
  background-color: #42b983 !important;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button.custom-btn:hover {
  background-color: #358c66;
}

button.custom-btn:focus {
  outline: none;
}

.pagination {
  justify-content: center;
}

.page-link {
  color: #42b983;
}

.page-item.active .page-link {
  background-color: #42b983 !important;
  border: #42b983;
  color: white !important;
}

.page-link:hover {
  color: white;
  background-color: #42b983;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: var(--main-color);
}

.card {
  border: none;
  margin-bottom: 24px;
  -webkit-box-shadow: 0 0 13px 0 rgba(236, 236, 241, 0.44);
  box-shadow: 0 0 13px 0 rgba(236, 236, 241, 0.44);
}

.avatar-xs {
  height: 2.3rem;
  width: 2.3rem;
}
</style>
