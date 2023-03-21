// Generated by gencpp from file stagehands/setTargetPoseResponse.msg
// DO NOT EDIT!


#ifndef STAGEHANDS_MESSAGE_SETTARGETPOSERESPONSE_H
#define STAGEHANDS_MESSAGE_SETTARGETPOSERESPONSE_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>


namespace stagehands
{
template <class ContainerAllocator>
struct setTargetPoseResponse_
{
  typedef setTargetPoseResponse_<ContainerAllocator> Type;

  setTargetPoseResponse_()
    : response()  {
    }
  setTargetPoseResponse_(const ContainerAllocator& _alloc)
    : response(_alloc)  {
  (void)_alloc;
    }



   typedef std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other >  _response_type;
  _response_type response;





  typedef boost::shared_ptr< ::stagehands::setTargetPoseResponse_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::stagehands::setTargetPoseResponse_<ContainerAllocator> const> ConstPtr;

}; // struct setTargetPoseResponse_

typedef ::stagehands::setTargetPoseResponse_<std::allocator<void> > setTargetPoseResponse;

typedef boost::shared_ptr< ::stagehands::setTargetPoseResponse > setTargetPoseResponsePtr;
typedef boost::shared_ptr< ::stagehands::setTargetPoseResponse const> setTargetPoseResponseConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::stagehands::setTargetPoseResponse_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::stagehands::setTargetPoseResponse_<ContainerAllocator> >::stream(s, "", v);
return s;
}


template<typename ContainerAllocator1, typename ContainerAllocator2>
bool operator==(const ::stagehands::setTargetPoseResponse_<ContainerAllocator1> & lhs, const ::stagehands::setTargetPoseResponse_<ContainerAllocator2> & rhs)
{
  return lhs.response == rhs.response;
}

template<typename ContainerAllocator1, typename ContainerAllocator2>
bool operator!=(const ::stagehands::setTargetPoseResponse_<ContainerAllocator1> & lhs, const ::stagehands::setTargetPoseResponse_<ContainerAllocator2> & rhs)
{
  return !(lhs == rhs);
}


} // namespace stagehands

namespace ros
{
namespace message_traits
{





template <class ContainerAllocator>
struct IsMessage< ::stagehands::setTargetPoseResponse_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::stagehands::setTargetPoseResponse_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::stagehands::setTargetPoseResponse_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::stagehands::setTargetPoseResponse_<ContainerAllocator> const>
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::stagehands::setTargetPoseResponse_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::stagehands::setTargetPoseResponse_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::stagehands::setTargetPoseResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "6de314e2dc76fbff2b6244a6ad70b68d";
  }

  static const char* value(const ::stagehands::setTargetPoseResponse_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0x6de314e2dc76fbffULL;
  static const uint64_t static_value2 = 0x2b6244a6ad70b68dULL;
};

template<class ContainerAllocator>
struct DataType< ::stagehands::setTargetPoseResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "stagehands/setTargetPoseResponse";
  }

  static const char* value(const ::stagehands::setTargetPoseResponse_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::stagehands::setTargetPoseResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "string response\n"
;
  }

  static const char* value(const ::stagehands::setTargetPoseResponse_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::stagehands::setTargetPoseResponse_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.response);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct setTargetPoseResponse_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::stagehands::setTargetPoseResponse_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::stagehands::setTargetPoseResponse_<ContainerAllocator>& v)
  {
    s << indent << "response: ";
    Printer<std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other > >::stream(s, indent + "  ", v.response);
  }
};

} // namespace message_operations
} // namespace ros

#endif // STAGEHANDS_MESSAGE_SETTARGETPOSERESPONSE_H
