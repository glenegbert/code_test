#Create your ruby class here#
require 'pry'

class Stats
  def self.letter_count(string)
    letter_count = Hash.new(0)
    no_spaces_string = string.gsub(/\W/,"").downcase
    string_as_array = no_spaces_string.split("")
    # string_as_array.each do |letter|
    #               letter_count[letter.to_sym] += 1
    #             end
    letter_count_array = string_as_array.uniq.map {|letter| [letter.to_sym, string_as_array.count(letter)]}
    sorted = letter_count_array.sort_by { |pair| pair[1]}.reverse
    letter_count_hash = Hash[sorted]
    return letter_count_hash


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
