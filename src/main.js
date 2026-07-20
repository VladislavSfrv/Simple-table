import './style.css';
import { data } from './data.js';

// Ссылки на все элементы страницы
const tbody = document.getElementById('table-body');
const searchInput = document.getElementById('search');
const resetBtn = document.getElementById('reset');
const filterDate = document.getElementById('filter-date');
const filterCustomer = document.getElementById('filter-customer');
const filterSeller = document.getElementById('filter-seller');
const filterTotalFrom = document.getElementById('filter-total-from');
const filterTotalTo = document.getElementById('filter-total-to');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const rowsPerPageSelect = document.getElementById('rows-per-page');
const sortHeaders = document.querySelectorAll('th[data-field]');

// Состояние таблицы
const state = {
    search: '',
    sortField: null,
    sortOrder: 'asc',
    filterDate: '',
    filterCustomer: '',
    filterSeller: '',
    filterTotalFrom: '',
    filterTotalTo: '',
    page: 1,
    rowsPerPage: 10,
};

// @TODO: Заполнить выпадающий список именами продавцов


// Функция для отрисовки строк, в аргументах получает массив со всеми данными о продажах
function renderRows(rows) {
    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Ничего не найдено</td></tr>';
        return;
    }

    tbody.innerHTML = rows.map(row => `
        <tr>
            <td>${row.date}</td>
            <td>${row.customer}</td>
            <td>${row.seller}</td>
            <td>${row.total}</td>
        </tr>
    `).join('');
}

// @TODO: Реализовать функцию глобального поиска
function applySearch(rows) {
    return rows
}

// @TODO: Реализовать функцию сортировки
function applySort(rows) {
    return rows
}

// @TODO: Реализовать функцию фильтрации
function applyFilters(rows) {
    return rows
}

// @TODO: Реализовать функцию пагинации
function applyPagination(rows) {
    return rows
}

// Основная функция render
function render() {
    // Копируем массив data, чтобы не изменять его на прямую
    let result = [...data];

    // Применение всех компонентов
    result = applySearch(result);
    result = applySort(result);
    result = applyFilters(result);
    result = applyPagination(result);

    renderRows(result);
    updateSortIndicators();
}

function updateSortIndicators() {
    sortHeaders.forEach(th => {
        const field = th.dataset.field;
        if (field === state.sortField) {
            th.dataset.order = state.sortOrder;
        } else {
            delete th.dataset.order;
        }
    });
}

function readStateFromInputs() {
    state.search = searchInput.value;
    state.filterDate = filterDate.value;
    state.filterCustomer = filterCustomer.value;
    state.filterSeller = filterSeller.value;
    state.filterTotalFrom = filterTotalFrom.value;
    state.filterTotalTo = filterTotalTo.value;
    state.rowsPerPage = Number(rowsPerPageSelect.value);
}

function resetAll() {
    searchInput.value = '';
    filterDate.value = '';
    filterCustomer.value = '';
    filterSeller.value = '';
    filterTotalFrom.value = '';
    filterTotalTo.value = '';
    state.sortField = null;
    state.sortOrder = 'asc';
    state.page = 1;
    readStateFromInputs();
    render();
}

searchInput.addEventListener('input', () => {
    readStateFromInputs();
    state.page = 1;
    render();
});

[filterDate, filterCustomer, filterSeller, filterTotalFrom, filterTotalTo].forEach(input => {
    input.addEventListener('input', () => {
        readStateFromInputs();
        state.page = 1;
        render();
    });
});

filterSeller.addEventListener('change', () => {
    readStateFromInputs();
    state.page = 1;
    render();
});

rowsPerPageSelect.addEventListener('change', () => {
    readStateFromInputs();
    state.page = 1;
    render();
});

sortHeaders.forEach(th => {
    th.addEventListener('click', () => {
        const field = th.dataset.field;

        if (state.sortField === field) {
            state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            state.sortField = field;
            state.sortOrder = 'asc';
        }

        render();
    });
});

prevPageBtn.addEventListener('click', () => {
    state.page -= 1;
    render();
});

nextPageBtn.addEventListener('click', () => {
    state.page += 1;
    render();
});

resetBtn.addEventListener('click', resetAll);

render();
