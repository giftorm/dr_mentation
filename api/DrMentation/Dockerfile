# Use the official Microsoft .NET 6 SDK image from Docker Hub
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

WORKDIR /app

EXPOSE 8080
EXPOSE 8081


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["DrMentation/DrMentation.csproj", "DrMentation/"]
COPY ["DrMentation.Contracts/DrMentation.Contracts.csproj", "DrMentation.Contracts/"]

RUN dotnet restore "DrMentation/DrMentation.csproj"

COPY . .

WORKDIR "/src/DrMentation"
RUN dotnet build "DrMentation.csproj" -c $BUILD_CONFIGURATION -o /app/build


FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "DrMentation.csproj" -c $BUILD_CONFIGURATION -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DrMentation.dll"]

