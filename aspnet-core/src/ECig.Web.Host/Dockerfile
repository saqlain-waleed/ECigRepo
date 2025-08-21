FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/ECig.Web.Host/ECig.Web.Host.csproj", "src/ECig.Web.Host/"]
COPY ["src/ECig.Web.Core/ECig.Web.Core.csproj", "src/ECig.Web.Core/"]
COPY ["src/ECig.Application/ECig.Application.csproj", "src/ECig.Application/"]
COPY ["src/ECig.Core/ECig.Core.csproj", "src/ECig.Core/"]
COPY ["src/ECig.EntityFrameworkCore/ECig.EntityFrameworkCore.csproj", "src/ECig.EntityFrameworkCore/"]
WORKDIR "/src/src/ECig.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/ECig.Web.Host", "src/ECig.Web.Host"]
COPY ["src/ECig.Web.Core", "src/ECig.Web.Core"]
COPY ["src/ECig.Application", "src/ECig.Application"]
COPY ["src/ECig.Core", "src/ECig.Core"]
COPY ["src/ECig.EntityFrameworkCore", "src/ECig.EntityFrameworkCore"]
WORKDIR "/src/src/ECig.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "ECig.Web.Host.dll"]
