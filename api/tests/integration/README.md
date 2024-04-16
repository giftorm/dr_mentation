# Test suit for DrMentation API

### Make sure the API is running

#### Instructions

```bash
$ cd ../../DrMentation
$ dotnet build
$ dotnet run --project DrMentation
```

### Python

#### Pyenv

##### Automatic Installer

```bash
$ curl https://pyenv.run | bash
```

_Follow the instructions and configure your .bashrc accordingly._

#### Python 3.12.3

```bash
$ pyenv install 3.12.3
$ pyenv local 3.12.3
```

#### Install dependencies

```bash
$ pip install -r requirements.txt
```

#### Run tests

```bash
integration $ source .venv/bin/activate
integration $ pytest
```

