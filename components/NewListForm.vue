<template>
  <section class="new-list-section">
    <v-container>
      <v-card class="new-list-form accent">
        <v-btn
        color="btn"
          class="white--text blue darken-2"
          v-if="!addListMode"
          @click="showAddListForm"
        >
          Add new list
        </v-btn>
        <v-from @submit.prevent="addNewList" v-if="addListMode" class="form">
          <v-container>
            <v-row>
              <v-text-field
                :class="isError && 'input-error'"
                v-model="listTitle"
                type="text"
                name="new-list"
                id="new-list"
              />

              <v-col align-self="center">
                <v-btn type="submit" class="white--text blue darken-2"
                  >Add</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-from>
        <span v-if="isError" class="error-msg"
          >please enter valid list name</span
        >
      </v-card>
    </v-container>
  </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({

  data() {
    return {
      listTitle: '',
      addListMode: false,
      isError: false,
    }
  },
  methods: {
    showAddListForm() {
      this.addListMode = !this.addListMode
    },
    addNewList() {
      if (this.listTitle.trim().length > 0) {
        this.isError = false
        this.addListMode = !this.addListMode
        this.$emit('add-list', this.listTitle)
      } else {
        this.isError = true
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.new-list-section {
  margin-bottom: 20px;
}
.new-list-form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px;
  border: none;
  color: #fff;
  background-color: #1c7ed6;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 700;
}

.input {
  height: 40px;
  border: 2px solid #1c7ed6;
  border-radius: 5px;
  font-size: 16px;
  padding: 0 15px;
  &:focus {
    outline: #339af0 solid 2px;
  }
}

.input-error {
  border: 2px solid #f03e3e;
}

.error-msg {
  color: #f03e3e;
  font-size: 12px;
}
</style>
