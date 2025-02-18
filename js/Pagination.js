class Pagination{
    
    constructor(currentPage, totalPages, fov){
        this.currentPage = Math.max(1, Math.min(currentPage, totalPages));
        this.totalPages = totalPages;
        this.fov = Math.max(2, fov);
    }

    buildPagination() {
        if (this.totalPages <= 1) {
            return ``;
        }

        let builtUrlParams = '';

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.forEach((val, key) => {
            if(key != 'page') { builtUrlParams += `&${key}=${val}`}
        });

        let html = '';
        let startPage, endPage;

        html += `<a class="link pagination__link ${this.currentPage === 1 ? 'pagination__link--chosen link--disabled' : ''}" href="?page=1${builtUrlParams}">1</a>`;

        if (this.totalPages <= this.fov + 2) {
            startPage = 2;
            endPage = this.totalPages - 1;
        } else {
            startPage = Math.max(2, this.currentPage - Math.floor(this.fov / 2));
            endPage = Math.min(this.totalPages - 1, this.currentPage + Math.floor(this.fov / 2));

            if (this.currentPage - startPage < Math.floor(this.fov / 2)) {
                endPage = Math.min(this.totalPages - 1, endPage + (Math.floor(this.fov / 2) - (this.currentPage - startPage)));
            }
            if (endPage - this.currentPage < Math.floor(this.fov / 2)) {
                startPage = Math.max(2, startPage - (Math.floor(this.fov / 2) - (endPage - this.currentPage)));
            }
        }

        if (startPage > 2) {
            html += `<a class="link pagination__link link--disabled">...</a>`;
        }

        for (let i = startPage; i <= endPage; i++) {
            html += `<a class="link pagination__link ${i === this.currentPage ? 'pagination__link--chosen link--disabled' : ''}" href="?page=${i}${builtUrlParams}">${i}</a>`;
        }

        if (endPage < this.totalPages - 1) {
            html += `<a class="link pagination__link link--disabled">...</a>`;
        }

        html += `<a class="link pagination__link ${this.currentPage === this.totalPages ? 'pagination__link--chosen link--disabled' : ''}" href="?page=${this.totalPages}${builtUrlParams}">${this.totalPages}</a>`;

        return html;
         
    }
};