# 4A_ILC_GHYS_MILHET_CLOUD_COMPUTING

[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)

[![checkSyntax](https://github.com/benjamin-milhet/4A_ILC_GHYS_MILHET_CLOUD_COMPUTING/actions/workflows/CheckSyntax.yml/badge.svg)](https://github.com/benjamin-milhet/4A_ILC_GHYS_MILHET_CLOUD_COMPUTING/actions/workflows/CheckSyntax.yml)
[![Docker Image CI](https://github.com/benjamin-milhet/4A_ILC_GHYS_MILHET_CLOUD_COMPUTING/actions/workflows/docker-image.yml/badge.svg)](https://github.com/benjamin-milhet/4A_ILC_GHYS_MILHET_CLOUD_COMPUTING/actions/workflows/docker-image.yml)


## Membres du groupe
 - Clément GHYS
 - Benjamin MILHET
 
## ILC

## Lancement des conteneurs

### REDIS
```
docker run --name myredis -p 6379:6379 redis
```

### BACKEND
```
docker build . --file back/Dockerfile --tag imagebackend
```

```
docker run imagebackend
```