FROM bitnami/minideb:latest

LABEL maintainer="Amir Pourmand"

# Update and install system dependencies
RUN apt-get update -y && \
    apt-get install -y \
        locales \
        ruby-full \
        build-essential \
        zlib1g-dev \
        imagemagick \
        python3-pip \
        libv8-dev \
        libjemalloc-dev \
        nodejs \
        curl \
        git

# Set the locale
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

# Install Jupyter
RUN python3 -m pip install jupyter --break-system-packages

# Install Jekyll and Bundler
RUN gem install jekyll bundler

# Set up Jekyll working directory
RUN mkdir /srv/jekyll
WORKDIR /srv/jekyll

# Copy Gemfile and Gemfile.lock separately to leverage Docker cache
COPY Gemfile Gemfile.lock /srv/jekyll/

# Install gem dependencies
RUN bundle install

# Copy the rest of the site files
COPY . /srv/jekyll/

# Set Jekyll environment
ENV JEKYLL_ENV=production

EXPOSE 8080

# Start Jekyll server
CMD ["/bin/bash", "-c", "rm -rf Gemfile.lock && bundle install && echo 'Jekyll will be available at http://localhost:8080' && exec jekyll serve --watch --port=8080 --host=0.0.0.0 --livereload --verbose"]