export default {
	bind: function (el, binding, vnode) {
		this.handleDragStart = function (e) {
			e.target.classList.add('dragging')
			e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.setData('text', '*')
			vnode.context.$emit('drag-start')
		}

		this.handleDragOver = function (e) {
			if (e.preventDefault) {
				e.preventDefault()
			}
			e.dataTransfer.dropEffect = 'move'
			e.target.classList.add('drag-over')
			vnode.context.$emit('drag-over')
			return false
		}

		this.handleDragEnter = function (e) {
			vnode.context.$emit('drag-enter')
			e.target.classList.add('drag-enter')
		}

		this.handleDragLeave = function (e) {
			vnode.context.$emit('drag-leave')
			e.target.classList.remove('drag-enter', 'drag-over')
		}

		this.handleDrag = function () {
			vnode.context.$emit('drag')
		}

		this.handleDragEnd = function (e) {
			e.target.classList.remove('dragging', 'drag-over', 'drag-enter')
			vnode.context.$emit('drag-end')
		}

		this.handleDrop = function (e) {
			e.preventDefault()
			if (e.stopPropagation) {
				e.stopPropagation()
			}
			vnode.context.$emit('drop')
			return false
		}
		// setup the listeners
		el.setAttribute('draggable', 'true')
		el.addEventListener('dragstart', this.handleDragStart, false)
		el.addEventListener('dragenter', this.handleDragEnter, false)
		el.addEventListener('dragover', this.handleDragOver, false)
		el.addEventListener('drag', this.handleDrag, false)
		el.addEventListener('dragleave', this.handleDragLeave, false)
		el.addEventListener('dragend', this.handleDragEnd, false)
		el.addEventListener('drop', this.handleDrop, false)
	},
	unbind: function (el) {
		el.classList.remove('dragging', 'drag-over', 'drag-enter')
		el.removeAttribute('draggable')
		el.removeEventListener('dragstart', this.handleDragStart)
		el.removeEventListener('dragenter', this.handleDragEnter)
		el.removeEventListener('dragover', this.handleDragOver)
		el.removeEventListener('dragleave', this.handleDragLeave)
		el.removeEventListener('drag', this.handleDrag)
	}
}
