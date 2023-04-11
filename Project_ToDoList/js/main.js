
const Main = {

  listTasks: [],

  init: function() {
    this.cacheSelectors()
    this.bindEvents()
    this.getTasksSaved()
    this.builderTasksSaved()
  },

  cacheSelectors: function() {
    this.$btnCheck = document.querySelectorAll('.check')
    this.$btnRemove = document.querySelectorAll('.btn-remove')
    this.$inputTask = document.querySelector('#inputTask')
    this.$listTask = document.querySelector('#list')
  },

  bindEvents: function() {
    const self = this

    this.$btnCheck.forEach(button => {
      button.onclick = self.Events.checkButton_click      
    })

    this.$btnRemove.forEach(button => {
      button.onclick = self.Events.btnRemove_click.bind(self)
    })

    this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)
  },

  /* Funções */
  htmlInsert: function(valueTask) {
    return `
      <li>
        <div class="check"></div>
        <label class="task">${valueTask}</label>
        <button class="btn-remove" data-task=${valueTask}></button>
      </li>
    `
  },

  getTasksSaved: function() {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      this.listTasks = JSON.parse(savedTasks)
    } else {
      localStorage.setItem('tasks', JSON.stringify([]))
    }
  },

  builderTasksSaved: function() {
    let html = ''
    this.listTasks.forEach(item => {      
      html += this.htmlInsert(item.tasks)
    })
    this.$listTask.innerHTML = html

    this.cacheSelectors()
    this.bindEvents()
  },

  /* Eventos */
  Events: {
    checkButton_click: function(e){
      const li = e.target.parentElement
      
      li.classList.toggle('done')
    },

    inputTask_keypress: function(e) {
      const key = e.key
      const value = e.target.value

      if (key === 'Enter' && value !== '') {
        this.$listTask.innerHTML += this.htmlInsert(value)
        e.target.value = ''

        this.cacheSelectors()
        this.bindEvents()

        const arraySavedTasks = JSON.parse(localStorage.getItem('tasks'))
        const arrayTasks = [
          {tasks: value},
          ...arraySavedTasks,
        ]
        this.listTasks = arrayTasks

        const jsonTasks = JSON.stringify(arrayTasks)
        localStorage.setItem('tasks', JSON.stringify(arrayTasks))
      }
    },

    btnRemove_click: function(e) {
      const li = e.target.parentElement
      const value = e.target.dataset['task']

      li.classList.add('removed')
      setTimeout(() => li.classList.add('hidden'),300)

      const listTasksUpdated = this.listTasks.filter(item => item.tasks !== value)
      localStorage.setItem('tasks', JSON.stringify(listTasksUpdated))
      this.listTasks = listTasksUpdated
    }
  },

}

Main.init()