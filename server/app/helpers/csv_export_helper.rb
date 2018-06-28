require 'csv'

module CsvExportHelper
  def self.export(file_path, data_set)
    CSV.open(file_path, 'w') do |csv|
      csv << data_set.column_names
      data_set.each do |m|
        csv << m.attributes.values
      end
    end
    file_path
  end
end
