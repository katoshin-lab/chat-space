require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.test_framework false
    end
    class Application < Rails::Application
      config.autoload_paths += Dir[Rails.root.join('app', 'uploaders')]
      config.i18n.default_locale = :ja
      config.action_view.field_error_proc = proc { |html_tag, instance| html_tag }
      config.time_zone
      config.active_record.default_timezone = :local
    end
  end
end
