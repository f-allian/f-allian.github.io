FROM ruby:4.0.5-slim

ENV DEBIAN_FRONTEND=noninteractive \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    EXECJS_RUNTIME=Node \
    JEKYLL_ENV=production \
    BUNDLE_PATH=/usr/local/bundle

# Install system dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        build-essential \
        curl \
        git \
        imagemagick \
        inotify-tools \
        locales \
        nodejs \
        procps \
        python3-pip \
        zlib1g-dev \
        graphviz && \
    pip install --no-cache-dir --upgrade --break-system-packages nbconvert && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/* /tmp/*

# Set locale
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen

# Working directory
WORKDIR /srv/jekyll

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock /srv/jekyll/

# Install bundler and gems
RUN gem install --no-document bundler jekyll && \
    bundle install --jobs 4 --retry 3

# Copy entrypoint
COPY bin/entry_point.sh /tmp/entry_point.sh
RUN chmod +x /tmp/entry_point.sh

EXPOSE 8080
CMD ["/tmp/entry_point.sh"]
