#Create your ruby class here#
require 'pry'

class Stats
  def self.letter_count(string)
    Hash[letter_count_array(string)]
  end

  def self.clean_string(string)
    string.gsub(/\W/,"").downcase
  end

  def self.letter_count_array(string)
    string_as_array = clean_string(string).split("")
    count_array = string_as_array.uniq.map {|letter| [letter.to_sym, string_as_array.count(letter)]}
    count_array.sort_by { |pair| pair[1]}.reverse
  end

  def self.divisible(integer)
    (0..integer).map {|number| number if divisible_by?(number,3,5)}.compact
  end

  def self.divisible_by?(number, *integers)
    integers.any? {|integer| number % integer == 0}
  end
end
