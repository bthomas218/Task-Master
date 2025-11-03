export const STATUS = Object.freeze({
    TO_DO: "To do",
    IN_PROGRESS: "In progress",
    COMPLETE: "Complete",
});

/**
 * Class To Represent a Task in the To Do List
 * @id: unique identifier for task
 * @desc: a description of the task
 * @status: description of task progress (to do, in progress, complete)
 * @createdAt: time task was created
 * @updatedAt: time task was updated
 */
export default class Task {

    // Private Field
    #id
    #desc
    #status
    #createdAt
    #updatedAt

    // Public Field
    constructor(id, desc, status, createdAt, updatedAt) {
        this.#id = id;
        this.#desc = desc;
        this.#status = STATUS.TO_DO || status;
        this.#createdAt = createdAt || Date.now();
        this.#updatedAt = updatedAt || Date.now();
    }


    get id() { return this.#id; }

    get desc() { return this.#desc; }
    set desc(desc) { this.#desc = desc; this.#updatedAt = Date.now(); }

    get status() { return this.#status; }
    set status(status) {
        if(!Object.values(STATUS).includes(status)) {
            throw new Error(`Invalid Status: ${status}`);
        }
        this.#status = status;
        this.#updatedAt = Date.now();
    }

    get createdAt() { return this.#createdAt; }
    get updatedAt() { return this.#updatedAt; }
}