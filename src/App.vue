<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

interface Todo {
  content: string;
  done: boolean;
  createdAt: number;
}

const todos = ref<Todo[]>([]);
const name = ref<string | null>(null); // Add a type annotation

const input_content = ref<string>(""); // Add a type annotation

const todos_asc = computed(() => todos.value.sort((a, b) => a.createdAt - b.createdAt));

onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos") || "[]"); // Handle the case where localStorage.getItem("todos") is null
});

const addItem = () => {
  if (input_content.value === "") return;
  todos.value.push({
    content: input_content.value, // Fix the assignment
    done: false,
    createdAt: new Date().getTime(),
  });
};

const removeTodo = (todo: Todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

watch(todos, (newVal) => {
  localStorage.setItem("todos", JSON.stringify(newVal));
}, { deep: true });
</script>


<template>
  <main class="min-h-screen bg-background text-slate-100 flex flex-col justify-center items-center">
    <form class="flex flex-col w-96 p-5">
      <h1>Create a todo</h1>
      <input 
      class="px-5 py-3 border-border border-2 bg-transparent rounded-md mt-5"
      placeholder="e.g Do the dishes"
      type="text" 
      id="item" 
      v-model="input_content">
      <button 
      class="px-5 py-3 bg-primary/80 hover:bg-primary active:scale-95 transition-all font-bold w-full mt-5 rounded-md" 
      @click="addItem()">Add Todo</button>
    </form>
    <section>
      <h2 class="opacity-70">Todo list</h2>
      <div v-for="todo in todos_asc" class="flex gap-2 my-10 items-center">
        <label>
          <input type="checkbox" v-model="todo.done">
        </label>

        <div>
          <input type="text" :class="`text-white bg-transparent border border-border p-3 ${todo.done && 'line-through'}`" v-model="todo.content">
        </div>

        <div>
          <button @click="removeTodo(todo)" class="bg-red-500 h-12 w-20">Delete</button>
        </div>
      </div>
    </section>
  </main>
  <div>
  </div>
</template>

<style scoped>
  ::selection{
    @apply bg-[#384c5c]
  }
</style>
