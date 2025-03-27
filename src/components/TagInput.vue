<template>
  <div class="tag-input-container">
    <div class="tag-input-wrapper">
      <div class="tags-container">
        <span v-for="(tag, index) in tags" :key="index" class="tag">
          {{ tag }}
          <button class="tag-remove" @click="removeTag(index)">×</button>
        </span>
      </div>
      <input
        type="text"
        v-model="newTag"
        @keydown.enter.prevent="addTag"
        @input="handleInput"
        @keydown.delete="handleBackspace"
        placeholder="Press enter or add a comma after each tag"
        class="tag-input"
      />
    </div>
    <div class="tag-count" v-if="maxTags">{{ tags.length }} tags remaining</div>
  </div>
</template>

<script>
export default {
  name: 'TagInput',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    maxTags: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      tags: this.value,
      newTag: ''
    }
  },
  methods: {
    addTag() {
      const tag = this.newTag.trim();
      if (tag && !this.tags.includes(tag)) {
        if (!this.maxTags || this.tags.length < this.maxTags) {
          this.tags.push(tag);
          this.$emit('input', this.tags);
        }
      }
      this.newTag = '';
    },
    handleInput(e) {
      const lastChar = this.newTag.slice(-1);
      if (lastChar === ',') {
        const tag = this.newTag.slice(0, -1).trim();
        this.newTag = '';
        if (tag) {
          if (!this.tags.includes(tag)) {
            if (!this.maxTags || this.tags.length < this.maxTags) {
              this.tags.push(tag);
              this.$emit('input', this.tags);
            }
          }
        }
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
      this.$emit('input', this.tags);
    },
    handleBackspace(e) {
      if (!this.newTag && this.tags.length > 0) {
        this.removeTag(this.tags.length - 1);
      }
    }
  },
  watch: {
    value(newVal) {
      this.tags = newVal;
    }
  }
}
</script>

<style scoped>
.tag-input-container {
  width: 100%;
  margin: 10px 0;
}

.tag-input-wrapper {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 42px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #e0e0e0;
  border-radius: 16px;
  padding: 4px 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.tag-remove {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-remove:hover {
  color: #ff4444;
}

.tag-input {
  border: none;
  outline: none;
  flex: 1;
  min-width: 120px;
  font-size: 14px;
}

.tag-count {
  margin-top: 4px;
  font-size: 12px;
  color: #666;
  text-align: right;
}
</style>