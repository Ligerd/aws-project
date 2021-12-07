FROM python:3.9

WORKDIR /code

COPY ./products/requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./products/app /code/app

CMD ["uvicorn", "products.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
