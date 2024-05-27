# Use the official Microsoft .NET 6 SDK image from Docker Hub for build and runtime
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS base

WORKDIR /app

EXPOSE 8080
EXPOSE 8081

# Use the SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

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

# Use the SDK image for the final runtime stage to enable dotnet watch
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "watch", "run", "--project", "DrMentation", "--urls", "http://+:80", "--no-launch-profile"]

