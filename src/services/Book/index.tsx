import request from 'umi-request';

interface ParamsBookDetail {
  bookId?: number;
}

interface ParamsGetBookList {
  title?: string | null;
  status?: string | null;
  authorId?: number | null;
  categoryId?: number | null;
  page: number;
  size: number;
  sort: string;
}

export async function getBooks(params: ParamsGetBookList): Promise<API.BookItem[]> {
  return request('/public/book/list_search', {
    method: 'GET',
    params: params,
  });
}

export async function postBook(payload: API.BookItem) {
  return request('/book/create', {
    method: 'POST',
    data: payload,
  });
}

export async function putBook(payload: API.BookItem) {
  return request(`/book/update/`, {
    method: 'PUT',
    data: payload,
  });
}

export async function deleteBook() {
  return request(`/book/delete/`, {
    method: 'DELETE',
  });
}


export async function getBookDetail(
  params: ParamsBookDetail,
): Promise<API.BookItem> {
  return request('/public/book/info', {
    method: 'GET',
    params: params,
  });
}