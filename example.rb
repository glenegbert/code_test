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
    (0..integer).map {|integer| integer if integer % 3 == 0 || integer % 5 == 0}.compact
  end

end
# In a separate file, create a Ruby class. The class should have 2 methods, one that accepts a string as a param, and returns a hash.
#
# The method will return each unique letter (case-insensitive) the string contains in order from most frequent to least frequent.
#
# eg. if the input string is 'foo bar baz', the return should be {a=>2, b=>2, o=>2, f=>1, r=>1, z=>1}
#
# Use the text 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt arcu eget lacus blandit efficitur' as the string parameter.
#
# The second method will take an integer as a param and return an array of integers.
#
# The method will compare each number from 0 to the param and return an array of numbers that are evenly divisible by 3 and/or 5.
#
# eg. if the input integer is 10, the return should be [0,3,5,6,9,10]
