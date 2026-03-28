
export class Video {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public url: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}

    updateTitle(title: string) {
        if (!title) {
            throw new Error('Title cannot be empty');
        }
        this.title = title;
    }
}