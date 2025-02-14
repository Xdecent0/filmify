class Pagination{
    
    constructor(currentPage, totalPages, fov){
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.fov = fov;
    }

    buildPagination() {
        let html = '';

        
        if(this.currentPage == 1) {
            html += `<a class="link pagination__link pagination__link--chosen link--disabled" href="?page=1">1</a>`;
            for(var i = 2; i <= this.fov; i++){
                html += `<a class="link pagination__link" href="?page=${i}">${i}</a>`;
            }
            html += `<a class="link pagination__link link--disabled" disabled="disabled">...</a>`;
            html += `<a class="link pagination__link" href="?page=${this.totalPages}">${this.totalPages}</a>`;
        }
        else if(this.currentPage == this.totalPages) {
            html += `<a class="link pagination__link" href="?page=1">1</a>`;
            html += `<a class="link pagination__link link--disabled" disabled="disabled">...</a>`;
            for(var i = this.currentPage-this.fov+1; i < this.currentPage; i++){
                html += `<a class="link pagination__link" href="?page=${i}">${i}</a>`;
            }
            html += `<a class="link pagination__link pagination__link--chosen link--disabled" href="?page=${this.totalPages}">${this.totalPages}</a>`;
        }
        else {
            html += `<a class="link pagination__link" href="?page=1">1</a>`;
            if(this.currentPage > this.fov) html += `<a class="link pagination__link link--disabled" disabled="disabled">...</a>`;
            for (let i = Math.max(2, this.currentPage - Math.round(this.fov / 2)); i < this.currentPage; i++) {
                html += `<a class="link pagination__link" href="?page=${i}">${i}</a>`;
            }
            html += `<a class="link pagination__link pagination__link--chosen link--disabled" href="?page=${this.currentPage}">${this.currentPage}</a>`;
            for(let i = this.currentPage+1;i<=Math.min(499, this.currentPage+Math.round(this.fov/2));i++) { 
                html += `<a class="link pagination__link" href="?page=${i}">${i}</a>`; 
            }
            if(this.currentPage < this.totalPages-this.fov+1) html += `<a class="link pagination__link link--disabled" disabled="disabled">...</a>`;
            html += `<a class="link pagination__link" href="?page=${this.totalPages}">${this.totalPages}</a>`;
        }
        return html;        
    }
};