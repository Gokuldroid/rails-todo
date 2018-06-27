require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Server
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2
    config.secret_key_base = '45c69a6446d1a3ce3da7593990093b22a7c31c3929ac1498173bdd5a8ab6aa3bd17e4'

    config.before_configuration do
      env_file = File.join(Rails.root, 'config', 'application.yml')
      if File.exist?(env_file)
        YAML.safe_load(File.open(env_file)).each do |key, value|
          ENV[key.to_s] = value
        end
      end
    end

    Pony.options = {
      from: ENV['gmail_username'],
      via: :smtp,
      via_options: {
        address: 'smtp.gmail.com',
        port: '587',
        enable_starttls_auto: true,
        user_name: ENV['gmail_username'],
        password: ENV['gmail_password'],
        authentication: :plain, # :plain, :login, :cram_md5, no auth by default
        domain: 'localhost.localdomain' # the HELO domain provided by the client to the server
      }
    }

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
